import { createClient } from 'redis';
import { Transport } from '@modelcontextprotocol/sdk/shared/transport.js'
import { JSONRPCMessage } from '@modelcontextprotocol/sdk/types.js';

export class PubSubTransport implements Transport {
  private _readTopic = 'mcp_read';
  private _writeTopic = 'mcp_write';
  private _started = false;
  private redisClient;
  private subscriber;

  constructor(_readTopic = 'mcp_read', _writeTopic = 'mcp_write') {
    if (_readTopic) this._readTopic = _readTopic;
    if (_writeTopic) this._writeTopic = _writeTopic;
    this.redisClient = createClient({ url: 'redis://localhost:6379' });
    this.redisClient.on('error', (err) => console.log('Redis Client Error', err));
    this.subscriber = this.redisClient.duplicate();
    this.subscriber.on('error', (err) => console.log('Redis Subscriber Error', err));
  }

  onmessage?: (message: JSONRPCMessage) => void;

  async start() {
    if (this._started) {
      throw new Error('Transport already started');
    }
    await this.subscriber.connect();
    await this.subscriber.subscribe(this._readTopic, (message) => {
      const deserializedMessage: JSONRPCMessage = JSON.parse(message);
      this.onmessage?.(deserializedMessage);
    });

    this._started = true;
  }  

  async close() {
    if (!this._started) {
      throw new Error('Transport not started');
    }
    await this.subscriber.unsubscribe(this._readTopic);
    await this.subscriber.quit();
    if (this.redisClient.isOpen) {
      await this.redisClient.quit();
    }
    this._started = false;
  }

  async send(message: JSONRPCMessage) {
    if (!this._started) {
      throw new Error('Transport not started');
    }
    const messageString = JSON.stringify(message);
    await this.redisClient.connect();
    await this.redisClient.publish(this._writeTopic, messageString);
    await this.redisClient.quit();
  }
}