/** How long the intro loader stays on screen before the hero animates in */
export const INTRO_DURATION_SECONDS: number = 2.2;

/** Number of street lamps along the journey road */
export const JOURNEY_LAMP_COUNT: number = 13;

/** How many suspension bumps the truck makes while driving the whole journey */
export const JOURNEY_TRUCK_BUMPS: number = 70;

/**
 * How much longer you scroll to drive the journey on smaller screens, so the road
 * doesn't rush past in a couple of swipes. 1 = scroll distance equals road distance.
 */
export const JOURNEY_SCROLL_LENGTH_PHONE: number = 2.4;
export const JOURNEY_SCROLL_LENGTH_TABLET: number = 1.5;
export const JOURNEY_SCROLL_LENGTH_DESKTOP: number = 1;

/** How far (as a share of the screen width) the truck pulls ahead when you scroll fast */
export const JOURNEY_TRUCK_MAX_LEAD_PHONE: number = 0.16;
export const JOURNEY_TRUCK_MAX_LEAD_DESKTOP: number = 0.08;

/** The roadside is closer to the camera than the road, so it slides past a bit faster */
export const VERGE_PARALLAX_SPEED: number = 1.2;

/** Added to <body> while the journey section is pinned, so other UI can step aside */
export const JOURNEY_ACTIVE_BODY_CLASS: string = 'journey-is-active';

/** Scroll speed (px per second) at which the truck reaches its maximum lead */
export const JOURNEY_TRUCK_FULL_SPEED_VELOCITY: number = 2500;

/** How many full turns the big tyre makes while the "Why us" section scrolls past */
export const BIG_TYRE_TURNS: number = 1.5;

/** Number of tread blocks drawn around the big tyre */
export const TYRE_TREAD_COUNT: number = 36;

/** Seconds between two lightning strikes in the hero (random value inside this range) */
export const LIGHTNING_MIN_DELAY_SECONDS: number = 2.5;
export const LIGHTNING_MAX_DELAY_SECONDS: number = 6;
