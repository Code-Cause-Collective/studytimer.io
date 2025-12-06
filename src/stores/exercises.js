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

// 🔥 MOST IMPORTANT FIX:
export const ALL_EXERCISES = Object.fromEntries(EXERCISES_ENTRIES);

class ExercisesStore {
  // Attach so UI can use ExercisesStore.ALL_EXERCISES
  static ALL_EXERCISES = ALL_EXERCISES;

  /**
   * @param {number} exercisesCount
   * @param {{ categories?: string[], exercises?: string[] }} filters
   * @returns {import("../index.d.js").Exercise[]}
   */
  static getRandomExercises(exercisesCount, filters = {}) {
    const count = isNum(exercisesCount)
      ? exercisesCount
      : DEFAULT_SETTINGS.exercisesCount;

    const { categories = [], exercises = [] } = filters;

    const categoryFilter =
      Array.isArray(categories) && categories.length > 0 ? categories : null;

    const exerciseFilter =
      Array.isArray(exercises) && exercises.length > 0 ? exercises : null;

    let filteredEntries = categoryFilter
      ? EXERCISES_ENTRIES.filter(([category]) =>
          categoryFilter.includes(category)
        )
      : EXERCISES_ENTRIES;

    if (exerciseFilter) {
      filteredEntries = filteredEntries
        .map(([category, exerciseList]) => {
          const filteredList = exerciseList.filter((ex) =>
            exerciseFilter.includes(ex)
          );
          return filteredList.length > 0 ? [category, filteredList] : null;
        })
        .filter(Boolean);
    }

    const result = [];
    const used = new Set();

    const maxPairs = filteredEntries.reduce(
      (sum, [, list]) => sum + list.length,
      0
    );

    const limit = Math.min(count, maxPairs);

    while (result.length < limit) {
      const [category, list] =
        filteredEntries[Math.floor(Math.random() * filteredEntries.length)];

      const selected = list[Math.floor(Math.random() * list.length)];
      const key = `${category}:${selected}`;

      if (used.has(key)) continue;
      used.add(key);

      result.push({ category, name: selected });
    }

    return result;
  }
}

export default ExercisesStore;
