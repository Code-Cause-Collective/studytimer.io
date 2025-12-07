import { DEFAULT_SETTINGS } from '../stores/settings.js';
import { AUDIO_SOUND, CLIENT_ERROR_MESSAGE } from '../utils/constants.js';

class WebAudioApiService {
  /** @type {AudioContext | undefined} */
  #audioContext;
  /** @type {Record<string, string>} */
  #audioFiles = {};
  /** @type {boolean} */
  #initialized = false;
  /** @type {Map<string, AudioBuffer>} */
  #buffersMap = new Map();

  constructor() {
    this.#audioFiles = import.meta.glob('../assets/audio/*.mp3', {
      eager: true,
      import: 'default',
    });
  }

  get audioContext() {
    return this.#audioContext;
  }

  async init() {
    if (!this.#audioContext) {
      this.#audioContext = new AudioContext();
    }

    if (this.#audioContext.state === 'suspended') {
      await this.#audioContext.resume();
    }

    if (this.#initialized) return;
    this.#initialized = true;

    if (this.#buffersMap.size > 0) return;

    for (const [path, url] of Object.entries(this.#audioFiles)) {
      const name = /** @type {string} */ (
        path?.split('/')?.pop()?.replace('.mp3', '')
      );

      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = await this.#audioContext?.decodeAudioData(arrayBuffer);
        this.#buffersMap.set(name, buffer);
      } catch {
        console.error(CLIENT_ERROR_MESSAGE.PRELOAD_AUDIO_FAILED);
      }
    }
  }

  /**
   * @param {number} volume
   * @returns {GainNode}
   */
  #createGain(volume = DEFAULT_SETTINGS.audioVolume) {
    const gainNode = /** @type {GainNode} */ (this.#audioContext?.createGain());
    gainNode.gain.value = Math.min(Math.max(volume / 100, 0), 1);
    const destination = /** @type {AudioDestinationNode} */ (
      this.#audioContext?.destination
    );
    gainNode.connect(destination);
    return gainNode;
  }

  /**
   * @param {number} id
   * @param {number} volume
   * @returns {Promise<void>}
   */
  async playSound(id, volume = DEFAULT_SETTINGS.audioVolume) {
    if (!this.#audioContext) {
      console.error(
        `${CLIENT_ERROR_MESSAGE.PLAY_SOUND_FAILED} AudioContext unavailable.`
      );
      return;
    }

    const audioSounds = Object.values(AUDIO_SOUND);
    const matchingAudioSound = audioSounds.find(({ ID }) => ID === id);

    if (!matchingAudioSound) {
      // Fallback to default if sound not found
      return this.playSound(audioSounds[0].ID, volume);
    }

    try {
      const source = /** @type {AudioBufferSourceNode} */ (
        this.#audioContext?.createBufferSource()
      );
      source.buffer = /** @type {AudioBuffer} */ (
        this.#buffersMap.get(matchingAudioSound.NAME)
      );
      source.connect(this.#createGain(volume));
      source.start();
    } catch {
      console.error(CLIENT_ERROR_MESSAGE.PLAY_SOUND_FAILED);
    }
  }
}

export const webAudioApiService = new WebAudioApiService();
