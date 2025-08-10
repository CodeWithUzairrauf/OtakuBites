import React from 'react'
import { GiNoodles, GiSushis, GiMeat, GiChopsticks } from "react-icons/gi";
import { FaBowlRice, FaBoxOpen, FaFish } from "react-icons/fa6";

export const recipeData = [
    {
        id: "Ichiraku Ramen",
        name: "Ichiraku Ramen",
        icon: <GiNoodles />,
        desc: "Slurp your way through the ramen loved by Naruto himself!",
        Ingredients: [
            "Ramen noodles (fresh or instant)",
            "Pork belly (chashu style)",
            "Soft-boiled eggs (marinated if possible)",
            "Nori (seaweed sheets)",
            "Green onions (sliced)",
            "Menma (bamboo shoots)",
            "Ramen broth (tonkotsu, miso or shoyu)"
        ],
        Instructions: [
            "Prepare broth by simmering pork bones, soy sauce, miso, or preferred base for hours.",
            "Cook noodles according to package instructions and drain well.",
            "Slice chashu pork and prep toppings (eggs, nori, green onions).",
            "Place noodles in a bowl, pour hot broth over them.",
            "Top with pork, egg, bamboo, nori, and green onions.",
            "Serve hot and eat like a true shinobi!"
        ]
    },
    {
        id: "Omurice",
        name: "Omurice",
        icon: <FaBoxOpen />,
        desc: "A fluffy omelet over ketchup fried rice – a comfort food favorite.",
        Ingredients: [
            "Cooked rice",
            "Eggs",
            "Ketchup",
            "Chicken (diced)",
            "Onion (chopped)",
            "Salt and pepper",
            "Oil or butter"
        ],
        Instructions: [
            "Sauté onion and chicken until cooked.",
            "Add rice and ketchup, season with salt and pepper.",
            "Whisk eggs and cook into a soft omelet.",
            "Place omelet over rice, optionally drizzle with more ketchup."
        ]
    },
    {
        id: "Takoyaki",
        name: "Takoyaki",
        icon: <GiMeat />,
        desc: "Crispy outside, creamy inside – the famous octopus balls from Osaka.",
        Ingredients: [
            "Takoyaki batter mix",
            "Octopus pieces",
            "Green onions",
            "Tempura scraps (tenkasu)",
            "Takoyaki sauce",
            "Kewpie mayo",
            "Bonito flakes",
            "Seaweed powder"
        ],
        Instructions: [
            "Preheat takoyaki pan and oil the molds.",
            "Pour in batter, add octopus, green onions, and tenkasu.",
            "Flip until golden brown.",
            "Serve with takoyaki sauce, mayo, bonito flakes, and seaweed powder."
        ]
    },
    {
        id: "Sushi Platter",
        name: "Sushi Platter",
        icon: <GiSushis />,
        desc: "Inspired by Tokyo Ghoul’s high-end sushi bars.",
        Ingredients: [
            "Sushi rice",
            "Nori sheets",
            "Fresh tuna",
            "Fresh salmon",
            "Avocado",
            "Cucumber",
            "Soy sauce",
            "Wasabi",
            "Pickled ginger"
        ],
        Instructions: [
            "Cook and season sushi rice with rice vinegar, sugar, and salt.",
            "Slice fish, avocado, and cucumber into thin pieces.",
            "Place nori on a bamboo mat, spread rice evenly, and add fillings.",
            "Roll tightly and slice into bite-sized pieces.",
            "Arrange on a platter and serve with soy sauce, wasabi, and pickled ginger."
        ]
    },
    {
        id: "Bento Box",
        icon: <GiChopsticks />,
        name: "Bento Box",
        desc: "School lunch like in My Hero Academia.",
        Ingredients: [
            "Steamed rice",
            "Tamago (Japanese omelette)",
            "Fried chicken karaage",
            "Boiled broccoli",
            "Cherry tomatoes",
            "Pickled radish",
            "Soy sauce"
        ],
        Instructions: [
            "Prepare steamed rice and pack into the bento section.",
            "Cook tamago and slice into strips.",
            "Fry chicken karaage until golden brown.",
            "Add broccoli, cherry tomatoes, and pickled radish.",
            "Arrange everything neatly in the bento box and serve."
        ]
    },
    {
        id: "Onigiri",
        name: "Onigiri",
        icon: <FaBowlRice />,
        desc: "Rice ball like in One Piece.",
        Ingredients: [
            "Cooked Japanese rice",
            "Salt",
            "Nori strips",
            "Tuna mayo filling (or preferred filling)"
        ],
        Instructions: [
            "Wet hands and sprinkle with salt.",
            "Shape rice into a triangle, adding filling in the center.",
            "Wrap with a strip of nori.",
            "Serve fresh or pack for later."
        ]
    },
];