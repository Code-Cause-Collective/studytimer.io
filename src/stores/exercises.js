import { isNum } from '../utils/helpers.js';

import { DEFAULT_SETTINGS } from './settings.js';

/** @type {Readonly<Record<string, import("../index.d.js").ExerciseCategory>>} */
export const EXERCISE_CATEGORY = Object.freeze({
  UPPER_BODY: 'upperBody',
  LOWER_BODY: 'lowerBody',
  CORE: 'core',
  CARDIO: 'cardio',
  MOBILITY: 'mobility',
  BALANCE: 'balance',
  FULL_BODY: 'fullBody',
  STATIC_STRENGTH: 'staticStrength',
  YOGA: 'yoga',
});

/** @type {readonly import("../index.d.js").ExerciseEntries[]} */
const EXERCISES_ENTRIES = Object.freeze([
  [
    EXERCISE_CATEGORY.UPPER_BODY,
    Object.freeze([
      'Push-ups',
      'Wide push-ups',
      'Diamond push-ups',
      'Decline push-ups',
      'Incline push-ups',
      'Shoulder taps',
    ]),
  ],
  [
    EXERCISE_CATEGORY.LOWER_BODY,
    Object.freeze([
      'Squats',
      'Lunges',
      'Reverse lunges',
      'Side lunges',
      'Curtsy lunges',
      'Bulgarian split squat',
      'Calf raises',
      'Wall sit',
      'Hip thrusts',
    ]),
  ],
  [
    EXERCISE_CATEGORY.CORE,
    Object.freeze([
      'Sit-ups',
      'Crunches',
      'Bicycle crunches',
      'Leg raises',
      'Flutter kicks',
      'Scissor kicks',
      'Russian twists',
      'Plank',
      'Side plank',
      'Mountain climbers',
      'V-ups',
      'Supermans',
    ]),
  ],
  [
    EXERCISE_CATEGORY.CARDIO,
    Object.freeze([
      'Jumping jacks',
      'Burpees',
      'Standing knee drives',
      'Invisible jump rope',
    ]),
  ],
  [
    EXERCISE_CATEGORY.MOBILITY,
    Object.freeze([
      'Hip flexor stretch',
      'Hamstring stretch',
      'Quad stretch',
      'Ankle circles',
      'Arm circles',
      'Torso twists',
    ]),
  ],
  [
    EXERCISE_CATEGORY.BALANCE,
    Object.freeze([
      'Single-leg balance hold',
      'Single-leg toe touch',
      'Heel-to-toe walk',
      'Single-leg calf raise',
    ]),
  ],
  [
    EXERCISE_CATEGORY.FULL_BODY,
    Object.freeze(['Burpees', 'Mountain climbers', 'Jumping jacks']),
  ],
  [
    EXERCISE_CATEGORY.STATIC_STRENGTH,
    Object.freeze(['Static squat hold', 'Static plank hold']),
  ],
  [
    EXERCISE_CATEGORY.YOGA,
    Object.freeze([
      'Warrior pose',
      'Chair pose',
      'Tree pose',
      'Boat pose',
      'Bridge pose',
      'Crescent lunge hold',
    ]),
  ],
]);

class ExercisesStore {
  /**
   * @param {number} exercisesCount
   * @param {string[]} selectedCategories
   * @returns {import("../index.d.js").Exercise[]}
   */
  static getRandomExercises(exercisesCount, selectedCategories = []) {
    const count = isNum(exercisesCount)
      ? exercisesCount
      : DEFAULT_SETTINGS.exercisesCount;

    const allowedCategories =
      Array.isArray(selectedCategories) && selectedCategories.length > 0
        ? selectedCategories
        : null;

    const filteredEntries = allowedCategories
      ? EXERCISES_ENTRIES.filter(([category]) =>
          allowedCategories.includes(category)
        )
      : EXERCISES_ENTRIES;

    const result = [];
    const pairSet = new Set();

    const maxPairs = filteredEntries.reduce(
      (sum, [, list]) => sum + list.length,
      0
    );

    const limit = Math.min(count, maxPairs);

    while (result.length < limit) {
      const [randomCategory, exerciseList] =
        filteredEntries[Math.floor(Math.random() * filteredEntries.length)];

      const randomExercise =
        exerciseList[Math.floor(Math.random() * exerciseList.length)];

      const key = `${randomCategory}:${randomExercise}`;

      if (pairSet.has(key)) continue;

      pairSet.add(key);

      result.push({
        category: randomCategory,
        name: randomExercise,
      });
    }

    return result;
  }
}

export default ExercisesStore;
