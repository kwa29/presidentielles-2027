import type { GameEvent } from "./types";

export const EVENTS: GameEvent[] = [
  {
    id: "greve-generale",
    cond: (s) => s.cohesion < 45,
    text: "Une grève générale intersyndicale paralyse les transports pendant une semaine.",
    fx: { croissance: -0.2, popularite: -5, deficit: 0.1 },
  },
  {
    id: "emeutes",
    cond: (s) => s.securite < 45,
    text: "Des émeutes urbaines éclatent dans plusieurs grandes villes après un fait divers.",
    fx: { securite: -8, popularite: -6, cohesion: -4 },
  },
  {
    id: "degradation-note",
    cond: (s) => s.dette > 118,
    text: "Une agence de notation dégrade la note de la dette française. Les taux d'emprunt s'envolent.",
    fx: { deficit: 0.4, dette: 2, popularite: -4 },
  },
  {
    id: "motion-censure",
    cond: (s) => s.popularite < 35,
    text: "Une motion de censure est déposée à l'Assemblée. Elle échoue de justesse.",
    fx: { popularite: -3, cohesion: -3 },
  },
  {
    id: "ralentissement",
    cond: (s) => s.croissance < 0.5,
    text: "L'INSEE confirme un ralentissement marqué de la croissance ce trimestre.",
    fx: { chomage: 0.3, deficit: 0.2, popularite: -3 },
  },
  {
    id: "sommet-europe",
    cond: (s) => s.rayonnement < 40,
    text: "La France est marginalisée lors d'un sommet européen clé sur la défense.",
    fx: { rayonnement: -4, popularite: -2 },
  },
  {
    id: "scandale-ministre",
    cond: () => true,
    text: "Un scandale politique mineur éclabousse un ministre du gouvernement. La presse s'en empare.",
    fx: { popularite: -4 },
  },
  {
    id: "choc-energie",
    cond: () => true,
    text: "Une tension commerciale internationale fait bondir le prix de l'énergie.",
    fx: { croissance: -0.2, popularite: -3, cohesion: -2 },
  },
  {
    id: "sondage-embellie",
    cond: (s) => s.popularite > 60,
    text: "Un sondage confirme une embellie de l'opinion. La majorité reprend confiance.",
    fx: { popularite: 3, cohesion: 2 },
  },
  {
    id: "commerce-exterieur",
    cond: (s) => s.croissance > 1.3,
    text: "De bons chiffres du commerce extérieur redonnent de l'optimisme aux marchés.",
    fx: { croissance: 0.1, rayonnement: 2, popularite: 2 },
  },
  {
    id: "bruxelles-salue",
    cond: (s) => s.deficit < 4,
    text: "Bruxelles salue les efforts budgétaires engagés par la France.",
    fx: { rayonnement: 3, popularite: 2 },
  },
  {
    id: "canicule",
    cond: () => true,
    text: "Une canicule sévère pèse sur le système de santé et l'agriculture.",
    fx: { croissance: -0.1, cohesion: -2 },
  },
  {
    id: "fait-divers",
    cond: () => true,
    text: "Un fait divers judiciaire relance le débat sur la sécurité dans l'opinion.",
    fx: { securite: -2, popularite: -1 },
  },
  {
    id: "climat-apaise",
    cond: (s) => s.cohesion > 60,
    text: "Le climat social apaisé permet de faire passer une réforme sans heurts majeurs.",
    fx: { deficit: -0.1, popularite: 2 },
  },
];
