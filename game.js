/**
 * Blood Moon Shifters - Interactive Paranormal Romance Game
 * A browser-based visual novel/interactive fiction game
 */

// ============================================
// GAME STATE
// ============================================
const GameState = {
    currentScene: 'intro',
    romancePoints: 0,
    maxRomance: 100,
    choicesMade: [],
    flags: {},
    playerName: 'You',
    soundEnabled: true,
    gameStarted: false
};

// ============================================
// STORY CONTENT - All scenes and branching paths
// ============================================
const StoryContent = {
    // Opening scene - player arrives at the town
    intro: {
        location: "Ravenshollow - Town Limits",
        showCharacter: false,
        text: `The GPS died three miles back, and now your car sputters to a halt on a road you're certain wasn't on any map.

<span class="internal">Just my luck...</span>

Fog curls between ancient pine trees, thick as smoke. The moon hangs low—impossibly large, tinged with red at its edges. A <span class="emphasis">blood moon</span>, they call it.

Your grandmother's letter crinkles in your pocket. The inheritance that brought you here. A house in a town called <span class="emphasis">Ravenshollow</span>—a place your family never mentioned.

Through the mist, you spot a figure. Tall. Unnaturally still. Watching.`,
        choices: [
            {
                text: "Call out to them for help",
                nextScene: "first_meeting_friendly",
                romanceChange: 5,
                hint: "💜"
            },
            {
                text: "Stay in the car and lock the doors",
                nextScene: "first_meeting_cautious",
                romanceChange: 0
            },
            {
                text: "Get out and approach them slowly",
                nextScene: "first_meeting_bold",
                romanceChange: 10,
                hint: "💜💜"
            }
        ]
    },

    // First meeting - Friendly approach
    first_meeting_friendly: {
        location: "The Misty Road",
        showCharacter: true,
        characterName: "???",
        text: `<span class="dialogue">"Hello? I'm sorry to bother you, but my car broke down!"</span>

The figure moves—no, <span class="emphasis">glides</span>—through the fog toward you. As they emerge, your breath catches.

He's beautiful in a way that doesn't seem entirely human. Sharp cheekbones, silver-grey eyes that seem to glow faintly in the moonlight, dark hair falling across his forehead. He's dressed in black, and when he speaks, his voice is like velvet wrapped around thunder.

<span class="dialogue">"You shouldn't be here."</span> He stops just outside arm's reach. <span class="dialogue">"Not tonight. Not during the blood moon."</span>

<span class="internal">There's something in his gaze—warning, yes, but also... curiosity?</span>

<span class="dialogue">"Let me help you. But we need to move. Now."</span>`,
        choices: [
            {
                text: '"Why? What happens during the blood moon?"',
                nextScene: "questioning",
                romanceChange: 5,
                setFlag: { curious: true },
                hint: "💜"
            },
            {
                text: '"I can take care of myself."',
                nextScene: "defiant",
                romanceChange: 0,
                setFlag: { defiant: true }
            },
            {
                text: "Take his offered hand without hesitation",
                nextScene: "trusting",
                romanceChange: 15,
                setFlag: { trusting: true },
                hint: "💜💜"
            }
        ]
    },

    // First meeting - Cautious approach
    first_meeting_cautious: {
        location: "Inside Your Car",
        showCharacter: true,
        characterName: "???",
        text: `You slam the locks down, heart pounding. The figure tilts their head—an oddly inhuman gesture—then moves toward your car with fluid grace.

A knock on your window. You nearly scream.

<span class="dialogue">"I'm not going to hurt you."</span> The voice is deep, resonant. <span class="dialogue">"But staying in that vehicle won't protect you from what's coming."</span>

Through the foggy glass, you make out his features: impossibly handsome, with eyes that seem to catch the moonlight and reflect it back like a wolf's. His expression is unreadable.

<span class="dialogue">"The blood moon is rising. You need to trust me, or you won't survive the night."</span>

<span class="internal">Every instinct screams that he's dangerous. But somehow... you also sense he's telling the truth.</span>`,
        choices: [
            {
                text: "Roll down the window just a crack to talk",
                nextScene: "questioning",
                romanceChange: 5,
                setFlag: { cautious: true },
                hint: "💜"
            },
            {
                text: "Demand he prove he's not a threat",
                nextScene: "defiant",
                romanceChange: 0,
                setFlag: { defiant: true }
            },
            {
                text: "Something in his eyes makes you unlock the door",
                nextScene: "trusting",
                romanceChange: 10,
                setFlag: { instinctive: true },
                hint: "💜💜"
            }
        ]
    },

    // First meeting - Bold approach
    first_meeting_bold: {
        location: "The Misty Road",
        showCharacter: true,
        characterName: "???",
        text: `You step out of the car, chin raised. If something's going to happen, you'd rather face it head-on.

The stranger's eyes widen slightly—<span class="emphasis">surprise? Respect?</span>—as you walk toward him through the fog.

Up close, he's devastating. Tall enough that you have to crane your neck, with features that belong on a Renaissance sculpture. His silver eyes rake over you, and you feel heat bloom in your chest despite the cold.

<span class="dialogue">"Brave."</span> A ghost of a smile touches his lips. <span class="dialogue">"Or foolish. I haven't decided yet."</span>

<span class="dialogue">"My car died,"</span> you say, keeping your voice steady. <span class="dialogue">"And you're the only person I've seen in miles."</span>

<span class="dialogue">"I'm not a person."</span> His smile sharpens. <span class="dialogue">"Not entirely. But I'm your best chance of surviving the night."</span>`,
        choices: [
            {
                text: '"What do you mean, not entirely?"',
                nextScene: "questioning",
                romanceChange: 10,
                setFlag: { bold: true, curious: true },
                hint: "💜"
            },
            {
                text: '"I don\'t scare easily."',
                nextScene: "defiant",
                romanceChange: 5,
                setFlag: { bold: true, defiant: true },
                hint: "💜"
            },
            {
                text: "Meet his gaze without flinching. \"Show me.\"",
                nextScene: "trusting",
                romanceChange: 20,
                setFlag: { bold: true, trusting: true },
                hint: "💜💜💜"
            }
        ]
    },

    // Questioning path
    questioning: {
        location: "The Edge of the Forest",
        showCharacter: true,
        characterName: "Kael",
        text: `He studies you for a long moment, then seems to make a decision.

<span class="dialogue">"My name is Kael."</span> He gestures toward the forest. <span class="dialogue">"And this land... it belongs to my kind. Shifters."</span>

<span class="internal">Shifters? As in...</span>

As if reading your thoughts, Kael's eyes flash—literally <span class="emphasis">flash</span>—with an inner golden light. For just a heartbeat, you see something else behind his human features. Something wild. Something ancient.

<span class="dialogue">"The blood moon awakens the old magic,"</span> he continues. <span class="dialogue">"Makes us... harder to control. There are those in my pack who would see you as prey."</span>

He offers his hand. His palm is warm despite the cold night.

<span class="dialogue">"I'll take you somewhere safe. There's a cabin—your grandmother's cabin, actually. You have her eyes."</span>

<span class="internal">He knew my grandmother?</span>`,
        choices: [
            {
                text: '"How did you know my grandmother?"',
                nextScene: "grandmother_secret",
                romanceChange: 10,
                setFlag: { askedAboutGrandmother: true },
                hint: "💜"
            },
            {
                text: "Take his hand—you're done being afraid",
                nextScene: "journey_begin",
                romanceChange: 15,
                hint: "💜💜"
            }
        ]
    },

    // Defiant path
    defiant: {
        location: "The Misty Road",
        showCharacter: true,
        characterName: "Kael",
        text: `His jaw tightens at your words, but there's something like respect in his gaze.

<span class="dialogue">"I am Kael,"</span> he says, and his voice carries an edge now. <span class="dialogue">"Alpha of the Ravenshollow pack. And you..."</span>

He inhales deeply, closing his eyes. When they open again, they glow with golden fire.

<span class="dialogue">"You carry your grandmother's blood. I can smell it."</span>

Before you can react, a howl splits the night—close, hungry, wrong somehow. Kael's head snaps toward the sound, and when he looks back at you, all pretense of humanity is gone. His features have sharpened, become more angular. More <span class="emphasis">feral</span>.

<span class="dialogue">"They've caught your scent."</span> He grabs your wrist—his grip is iron. <span class="dialogue">"We run. Now."</span>

<span class="internal">The authority in his voice makes something primal in you want to obey.</span>`,
        choices: [
            {
                text: "Run with him without argument",
                nextScene: "journey_begin",
                romanceChange: 10,
                setFlag: { ranTogether: true },
                hint: "💜"
            },
            {
                text: '"Tell me what's hunting us!"',
                nextScene: "the_hunters",
                romanceChange: 5,
                setFlag: { demandedAnswers: true }
            }
        ]
    },

    // Trusting path
    trusting: {
        location: "The Moonlit Path",
        showCharacter: true,
        characterName: "Kael",
        text: `Something shifts in his expression—softens—as you show him your trust. His fingers close around yours, and warmth spreads up your arm.

<span class="dialogue">"I am Kael."</span> His thumb brushes across your knuckles, almost absently. <span class="dialogue">"And you are either the bravest human I've ever met... or the most foolish."</span>

<span class="dialogue">"Maybe both,"</span> you hear yourself say.

That earns you a genuine smile—brief, but devastating. He pulls you closer as a howl echoes in the distance.

<span class="dialogue">"My pack. They've caught your scent."</span> His free hand cups your cheek, tilting your face up to meet his glowing eyes. <span class="dialogue">"I'm going to keep you safe. Do you believe me?"</span>

<span class="internal">His touch sends electricity through your veins. You've never felt so seen.</span>

<span class="dialogue">"I believe you,"</span> you whisper.`,
        choices: [
            {
                text: "Ask why he would protect a stranger",
                nextScene: "grandmother_secret",
                romanceChange: 15,
                setFlag: { askedWhy: true },
                hint: "💜💜"
            },
            {
                text: "Let him lead you into the darkness",
                nextScene: "journey_begin",
                romanceChange: 20,
                setFlag: { fullyTrusted: true },
                hint: "💜💜💜"
            }
        ]
    },

    // Grandmother's secret
    grandmother_secret: {
        location: "Moving Through the Forest",
        showCharacter: true,
        characterName: "Kael",
        text: `Kael's grip tightens on your hand as he guides you through the fog-wrapped trees.

<span class="dialogue">"Your grandmother..."</span> He pauses, silver eyes distant. <span class="dialogue">"She was special to my pack. To me. She had the gift—the ability to sense the supernatural, to walk between worlds."</span>

He glances at you, something vulnerable in his gaze.

<span class="dialogue">"She was also the only human I ever trusted. When she left Ravenshollow, she made me promise to protect her bloodline."</span>

<span class="internal">Grandmother never mentioned any of this. The secrets she kept...</span>

<span class="dialogue">"You have her fire."</span> Kael's voice drops lower. <span class="dialogue">"And her light. I sensed it the moment you arrived."</span>

Another howl, closer now. His body tenses against yours.

<span class="dialogue">"There will be time for stories. But first, we need to reach the cabin."</span>`,
        choices: [
            {
                text: "Promise to hear the full story later",
                nextScene: "journey_begin",
                romanceChange: 15,
                setFlag: { promisedToListen: true },
                hint: "💜💜"
            },
            {
                text: "\"I'm starting to feel like I was meant to come here.\"",
                nextScene: "journey_begin",
                romanceChange: 20,
                setFlag: { feltDestiny: true },
                hint: "💜💜💜"
            }
        ]
    },

    // The hunters explanation
    the_hunters: {
        location: "The Dark Woods",
        showCharacter: true,
        characterName: "Kael",
        text: `<span class="dialogue">"Rogues,"</span> Kael snarls as he pulls you through the trees. <span class="dialogue">"Shifters who've rejected pack law. They see the blood moon as a chance to take what they want without consequences."</span>

His eyes flash golden in the darkness.

<span class="dialogue">"And right now, they want you. New blood in their territory, carrying the scent of someone the old Alpha favored."</span>

<span class="dialogue">"Old Alpha?"</span>

<span class="dialogue">"My father. He and your grandmother..."</span> Kael's jaw tightens. <span class="dialogue">"It's complicated. But the rogues see you as a symbol. A way to hurt the pack."</span>

A shadow moves between the trees—too fast, too large. Kael puts himself between you and the darkness.

<span class="dialogue">"Stay close to me. No matter what you see."</span>`,
        choices: [
            {
                text: "\"I won't leave your side.\"",
                nextScene: "journey_begin",
                romanceChange: 15,
                setFlag: { stayedClose: true },
                hint: "💜💜"
            },
            {
                text: "\"What exactly am I going to see?\"",
                nextScene: "journey_begin",
                romanceChange: 10,
                setFlag: { preparedForTruth: true },
                hint: "💜"
            }
        ]
    },

    // Journey through the forest
    journey_begin: {
        location: "Deep in Ravenshollow Forest",
        showCharacter: true,
        characterName: "Kael",
        text: `The forest seems alive around you—whispers in the wind, shadows that move when they shouldn't. But with Kael's hand in yours, you feel strangely safe.

Then he stops abruptly, nostrils flaring.

<span class="dialogue">"They've circled ahead."</span> His voice is barely a growl. <span class="dialogue">"We need to make a choice."</span>

He turns to face you fully, moonlight painting silver in his hair. For a moment, you see the weight of centuries in his eyes—the loneliness of being something other.

<span class="dialogue">"The cabin is through the clearing ahead. Fifty yards. But there are at least three rogues between us and safety."</span>

He takes both your hands in his.

<span class="dialogue">"I can shift—become the wolf—and fight them. Keep them busy while you run. Or..."</span>

His gaze drops to your lips, then back up.

<span class="dialogue">"Or I mark you. Temporarily. My scent on you would give them pause. Make them see you as pack, not prey."</span>`,
        choices: [
            {
                text: "\"Shift. I trust you to protect us both.\"",
                nextScene: "wolf_fight",
                romanceChange: 10,
                setFlag: { sawWolfForm: true },
                hint: "💜"
            },
            {
                text: "\"Mark me. Whatever it takes.\"",
                nextScene: "the_mark",
                romanceChange: 25,
                setFlag: { acceptedMark: true },
                hint: "💜💜💜"
            },
            {
                text: "\"I'll fight with you. I'm not helpless.\"",
                nextScene: "fight_together",
                romanceChange: 15,
                setFlag: { foughtTogether: true },
                hint: "💜💜"
            }
        ]
    },

    // Wolf transformation scene
    wolf_fight: {
        location: "The Blood Moon Clearing",
        showCharacter: true,
        characterName: "Kael",
        text: `<span class="dialogue">"Stay behind me. And don't look away."</span>

Kael releases you and steps forward. The transformation begins.

It should be horrifying—bones cracking, reshaping, skin rippling like water. But instead, it's <span class="emphasis">beautiful</span>. Moonlight wraps around him like silk as he falls forward onto four massive paws.

The wolf that stands before you is enormous—shoulder-height with obsidian fur that seems to absorb the light. His eyes remain silver, fixed on yours, and somehow you know: <span class="emphasis">it's still him</span>.

He throws back his head and <span class="emphasis">howls</span>—a sound that shakes your bones and sets the night on fire.

Answering howls, angry and challenging. Three shapes burst from the trees. Kael meets them with fang and fury, moving like liquid shadow.

You can't look away. You shouldn't <span class="emphasis">want</span> to look away.

<span class="internal">He's magnificent.</span>`,
        choices: [
            {
                text: "Watch in awe as he defeats them",
                nextScene: "after_battle",
                romanceChange: 15,
                setFlag: { admiredWolf: true },
                hint: "💜💜"
            },
            {
                text: "Grab a branch—defend yourself if needed",
                nextScene: "after_battle",
                romanceChange: 10,
                setFlag: { armedSelf: true },
                hint: "💜"
            }
        ]
    },

    // The mark scene (intimate)
    the_mark: {
        location: "Beneath the Blood Moon",
        showCharacter: true,
        characterName: "Kael",
        text: `Kael's breath catches. He steps closer, close enough that you can feel heat radiating from his skin.

<span class="dialogue">"This will feel... intense,"</span> he warns, voice rough. <span class="dialogue">"My scent, my essence, bonding with yours. It's temporary, but—"</span>

<span class="dialogue">"I'm not afraid."</span>

His hands find your waist, drawing you against him. Your heart hammers as he lowers his face to your neck, his breath warm against your pulse point.

<span class="dialogue">"Brave one,"</span> he murmurs against your skin. <span class="dialogue">"My grandmother would have loved you."</span>

Then he presses his lips to your throat—not a kiss, something deeper. Something <span class="emphasis">ancient</span>. Energy floods through you like moonlight made liquid, and you gasp, fingers clutching his shoulders.

When he pulls back, his eyes are molten gold.

<span class="dialogue">"Now you are mine,"</span> he says softly. <span class="dialogue">"At least for tonight."</span>

<span class="internal">Why does 'tonight' feel like it won't be long enough?</span>`,
        choices: [
            {
                text: "\"Maybe I don't want it to be temporary.\"",
                nextScene: "after_battle",
                romanceChange: 30,
                setFlag: { wantedMore: true, romantic: true },
                hint: "💜💜💜💜"
            },
            {
                text: "Touch his face. \"Thank you for protecting me.\"",
                nextScene: "after_battle",
                romanceChange: 20,
                setFlag: { grateful: true },
                hint: "💜💜"
            }
        ]
    },

    // Fight together scene
    fight_together: {
        location: "The Battle Clearing",
        showCharacter: true,
        characterName: "Kael",
        text: `<span class="dialogue">"Stubborn,"</span> Kael growls, but there's pride in his eyes. <span class="dialogue">"Very well. Stay at my back."</span>

He doesn't fully shift—instead, he becomes something between. Claws extend from his fingertips. His features sharpen, becoming wolfish while remaining human. It's terrifying. It's <span class="emphasis">exhilarating</span>.

The rogues emerge—snarling, half-transformed monstrosities. But you've found a sturdy branch, and when one lunges at your flank, you swing with everything you have.

It connects. The creature yelps.

<span class="dialogue">"Behind you!"</span> Kael roars, and you duck as he launches over your head, meeting the second rogue mid-air.

By the time the third flees into the darkness, you're both breathing hard. Kael's gaze finds yours, wild and approving.

<span class="dialogue">"I've never met anyone like you."</span>`,
        choices: [
            {
                text: "\"Is that a good thing?\"",
                nextScene: "after_battle",
                romanceChange: 20,
                setFlag: { flirtatious: true },
                hint: "💜💜💜"
            },
            {
                text: "\"We make a good team.\"",
                nextScene: "after_battle",
                romanceChange: 15,
                setFlag: { teamPlayer: true },
                hint: "💜💜"
            }
        ]
    },

    // After the battle
    after_battle: {
        location: "Grandmother's Cabin",
        showCharacter: true,
        characterName: "Kael",
        text: `The cabin appears through the trees like a promise—stone walls, a wooden porch, smoke already rising from the chimney.

<span class="dialogue">"Magic,"</span> Kael explains, seeing your surprise. <span class="dialogue">"The cabin knows when someone of your bloodline is coming."</span>

Inside, it's warm and surprisingly cozy. Dried herbs hang from the rafters. Books line every wall. And on the mantle, there's a photo—your grandmother, young and beautiful, standing next to a man with familiar silver eyes.

<span class="dialogue">"My father,"</span> Kael says softly, following your gaze. <span class="dialogue">"They were... complicated. As these things often are."</span>

He turns to you, his half-shifted features smoothing back to human. In the firelight, he looks almost vulnerable.

<span class="dialogue">"You can stay here tonight. You'll be safe—the cabin is warded. I should go before..."</span>

He hesitates, conflict written across his features.`,
        choices: [
            {
                text: "\"Stay. Please.\"",
                nextScene: "stay_together",
                romanceChange: 25,
                setFlag: { askedHimToStay: true },
                hint: "💜💜💜"
            },
            {
                text: "\"What happens at dawn?\"",
                nextScene: "dawn_decision",
                romanceChange: 10,
                setFlag: { askedAboutDawn: true },
                hint: "💜"
            },
            {
                text: "\"Thank you for everything. I understand if you need to leave.\"",
                nextScene: "letting_go",
                romanceChange: 5,
                setFlag: { letHimGo: true }
            }
        ]
    },

    // He stays
    stay_together: {
        location: "By the Fire",
        showCharacter: true,
        characterName: "Kael",
        text: `The word seems to freeze him. Then, slowly, he closes the door.

<span class="dialogue">"The blood moon affects my control,"</span> he warns, voice strained. <span class="dialogue">"I shouldn't be this close to you. Especially not after..."</span>

His gaze drops to your throat, where his mark still tingles with warmth.

<span class="dialogue">"I want to stay,"</span> he admits. <span class="dialogue">"More than I've wanted anything in centuries. That terrifies me."</span>

You step closer. Close enough to feel his breath, to see the flecks of gold in his silver eyes.

<span class="dialogue">"I came to Ravenshollow looking for answers about my family,"</span> you say softly. <span class="dialogue">"But I think... maybe I was looking for something else too."</span>

<span class="dialogue">"And what did you find?"</span>

<span class="internal">You found him.</span>`,
        choices: [
            {
                text: "Kiss him",
                nextScene: "romantic_ending_setup",
                romanceChange: 30,
                setFlag: { kissed: true, deepRomance: true },
                hint: "💜💜💜💜"
            },
            {
                text: "\"Stay until dawn. We can figure out the rest after.\"",
                nextScene: "tender_night",
                romanceChange: 20,
                setFlag: { tenderNight: true },
                hint: "💜💜💜"
            }
        ]
    },

    // Dawn decision
    dawn_decision: {
        location: "Grandmother's Cabin",
        showCharacter: true,
        characterName: "Kael",
        text: `<span class="dialogue">"At dawn, the blood moon's power fades."</span> Kael moves to the window, gazing out at the crimson-tinged sky. <span class="dialogue">"The rogues will retreat. My control will return."</span>

He looks back at you.

<span class="dialogue">"But you'll have to make a choice. Return to your life—pretend this was all a dream. The cabin will accept you regardless."</span>

<span class="dialogue">"Or?"</span>

<span class="dialogue">"Or embrace your grandmother's legacy. Learn the truth of what you are, what you could become. Stay in Ravenshollow."</span> His voice drops. <span class="dialogue">"Stay... with me."</span>

<span class="internal">One night. One impossible night. And now a decision that could change everything.</span>`,
        choices: [
            {
                text: "\"I've spent my whole life playing it safe. Not anymore.\"",
                nextScene: "romantic_ending_setup",
                romanceChange: 25,
                setFlag: { choseTostay: true },
                hint: "💜💜💜"
            },
            {
                text: "\"I need time to think... but I don't want you to leave yet.\"",
                nextScene: "tender_night",
                romanceChange: 15,
                setFlag: { needsTime: true },
                hint: "💜💜"
            }
        ]
    },

    // Letting him go
    letting_go: {
        location: "Grandmother's Cabin - Doorway",
        showCharacter: true,
        characterName: "Kael",
        text: `Something flickers in his eyes—disappointment? Or perhaps relief at not having to fight his nature.

<span class="dialogue">"You are kind,"</span> he says quietly. <span class="dialogue">"Like she was."</span>

He pauses at the door, hand on the frame.

<span class="dialogue">"The rogues won't bother you here. And at dawn... I'll return. We should talk. About your grandmother. About..."</span>

His gaze lingers on your face.

<span class="dialogue">"About possibilities."</span>

Then he's gone, melting into the moonlit forest like shadow.

You explore the cabin alone, finding journals, pressed flowers, and more questions than answers. Sleep comes eventually, restless and full of silver eyes.

<span class="internal">Dawn can't come soon enough.</span>`,
        choices: [
            {
                text: "Wait for dawn with hope in your heart",
                nextScene: "hopeful_ending_setup",
                romanceChange: 5,
                setFlag: { waited: true },
                hint: "💜"
            },
            {
                text: "Focus on exploring your grandmother's secrets",
                nextScene: "bittersweet_ending_setup",
                romanceChange: 0,
                setFlag: { focused: true }
            }
        ]
    },

    // Tender night
    tender_night: {
        location: "By the Fireside",
        showCharacter: true,
        characterName: "Kael",
        text: `Kael settles beside you on the rug before the fire. Close, but not touching. Respecting your pace.

The hours pass in conversation—stories of your grandmother, of the pack, of the ancient magic that runs through Ravenshollow. He tells you of his centuries of solitude, of the weight of leadership, of never expecting to feel this way about anyone.

<span class="dialogue">"She told me once,"</span> Kael says, voice soft, <span class="dialogue">"that her granddaughter would change everything. I didn't believe her."</span>

<span class="dialogue">"And now?"</span>

He reaches out, tucking a strand of hair behind your ear. His touch is impossibly gentle for someone so dangerous.

<span class="dialogue">"Now I believe in a lot of things I didn't before."</span>

Outside, the blood moon finally fades. Dawn paints the sky in shades of rose and gold.

<span class="internal">This feels like the beginning of something extraordinary.</span>`,
        choices: [
            {
                text: "\"I want to stay. In Ravenshollow. With you.\"",
                nextScene: "romantic_ending_setup",
                romanceChange: 25,
                setFlag: { decidedToStay: true },
                hint: "💜💜💜"
            },
            {
                text: "\"Will you teach me about my grandmother's world?\"",
                nextScene: "hopeful_ending_setup",
                romanceChange: 15,
                setFlag: { wantsToLearn: true },
                hint: "💜💜"
            }
        ]
    },

    // Romantic ending setup
    romantic_ending_setup: {
        location: "Grandmother's Cabin - Dawn",
        showCharacter: true,
        characterName: "Kael",
        text: `The kiss—or the choice—changes everything.

Kael's arms wrap around you like coming home. His lips are soft, urgent, tasting of moonlight and promises. The mark on your throat pulses with warmth, and you feel something <span class="emphasis">click</span> into place. A bond. Ancient and unbreakable.

<span class="dialogue">"This is forever,"</span> he breathes against your lips. <span class="dialogue">"What you're agreeing to—a life here, with me, with my pack—it's not simple. It won't be easy."</span>

<span class="dialogue">"I don't want easy."</span> You pull back just enough to meet his golden eyes. <span class="dialogue">"I want this. I want you."</span>

<span class="dialogue">"Then you have me."</span> His forehead rests against yours. <span class="dialogue">"All of me. Always."</span>

The sun breaks over the mountains, golden light flooding the cabin. The blood moon is gone, but its magic lingers in your veins, in the bond between you.

Your grandmother's voice seems to whisper on the wind: <span class="emphasis">I knew you'd find your way home.</span>`,
        choices: [
            {
                text: "Embrace your new life as the Alpha's mate",
                nextScene: "ending_romantic",
                romanceChange: 10
            }
        ]
    },

    // Hopeful ending setup
    hopeful_ending_setup: {
        location: "Grandmother's Cabin - Dawn",
        showCharacter: true,
        characterName: "Kael",
        text: `Dawn light streams through the windows as Kael returns. He looks different in daylight—softer, more human. But his eyes still hold that otherworldly silver gleam when he looks at you.

<span class="dialogue">"You stayed,"</span> he says, and there's wonder in his voice.

<span class="dialogue">"I have a lot of questions."</span>

<span class="dialogue">"And I have a lot of answers."</span> He steps inside, careful, hopeful. <span class="dialogue">"If you'll have them."</span>

The space between you crackles with possibility. Not love yet—maybe—but something that could become it. Something worth exploring.

<span class="dialogue">"Teach me,"</span> you say. <span class="dialogue">"About the supernatural world. About my grandmother's gifts. About..."</span>

<span class="dialogue">"About us?"</span> He offers his hand, palm up. An invitation.

<span class="internal">This time, you don't hesitate to take it.</span>`,
        choices: [
            {
                text: "Begin your journey of discovery together",
                nextScene: "ending_hopeful",
                romanceChange: 10
            }
        ]
    },

    // Bittersweet ending setup
    bittersweet_ending_setup: {
        location: "Grandmother's Cabin - Morning",
        showCharacter: true,
        characterName: "Kael",
        text: `The journals consume you through the night. Your grandmother's handwriting reveals a life of secrets—of magic, of love, of sacrifice.

When dawn comes, you understand why she left Ravenshollow. Some bonds are too dangerous to keep.

Kael appears at the window, still in wolf form. He watches you through the glass, silver eyes sorrowful and knowing.

<span class="internal">He felt it too, didn't he? The pull between us. The impossibility of it.</span>

Slowly, he bows his great head—a gesture of respect, of farewell—and turns back toward the forest.

<span class="dialogue">"Wait,"</span> you whisper, though you know he can't hear you.

Or maybe he can, because he pauses at the tree line and looks back. One long, aching moment. A promise of what could have been.

Then he's gone.

<span class="internal">You have the cabin. You have answers. But somehow, you've never felt more alone.</span>`,
        choices: [
            {
                text: "Perhaps someday, you'll be brave enough to call him back",
                nextScene: "ending_bittersweet",
                romanceChange: 0
            }
        ]
    },

    // ============================================
    // ENDINGS
    // ============================================

    ending_romantic: {
        ending: true,
        type: "romantic",
        title: "Bound by Blood and Moonlight",
        icon: "🌹",
        text: `<p>You chose love. You chose the wild, the unknown, the terrifying beauty of a world beyond human understanding.</p>

<p>Months later, you stand on the porch of your grandmother's cabin—now <em>your</em> cabin—watching the moon rise. Kael's arms wrap around you from behind, his warmth a constant comfort.</p>

<p>"The pack has accepted you," he murmurs against your hair. "They adore you, actually."</p>

<p>"Is that why Lila keeps challenging me to arm wrestling?"</p>

<p>His laugh rumbles through you. "That's respect, my love."</p>

<p>You turn in his arms, rising on tiptoe to kiss him. The bond between you pulses—eternal, unbreakable.</p>

<p>"No regrets?" he asks, as he always does.</p>

<p>"Not a single one."</p>

<p>Above you, the blood moon rises again. But this time, you're not running from its magic.</p>

<p>You're running <em>with</em> it.</p>

<p class="ending-final"><strong>~ The Beginning of Forever ~</strong></p>`
    },

    ending_hopeful: {
        ending: true,
        type: "hopeful",
        title: "A New Chapter Begins",
        icon: "✨",
        text: `<p>You chose discovery. You chose to understand before you committed, to learn who you could become.</p>

<p>The weeks that follow are a revelation. Kael teaches you about the pack, the old magic, the gifts sleeping in your blood. Your grandmother's journals become a treasure map to a world you never knew existed.</p>

<p>And somewhere along the way, between lessons and laughter and lingering glances, something deeper begins to grow.</p>

<p>"You're not what I expected," Kael admits one evening, watching you successfully ward your first protective circle.</p>

<p>"What did you expect?"</p>

<p>"Someone who would run." His eyes meet yours, warm with something that makes your heart skip. "Not someone who would stay and fight."</p>

<p>"Maybe I'm exactly where I'm supposed to be."</p>

<p>He smiles—that rare, devastating smile—and for the first time, you let yourself imagine a future in Ravenshollow.</p>

<p>A future with him.</p>

<p class="ending-final"><strong>~ To Be Continued ~</strong></p>`
    },

    ending_bittersweet: {
        ending: true,
        type: "bittersweet",
        title: "What Might Have Been",
        icon: "🌙",
        text: `<p>You chose safety. Protection. The familiar ache of loneliness over the terrifying unknown of love.</p>

<p>The cabin becomes your home. You learn your grandmother's magic, tend her garden, make friends with the townspeople who whisper about the old woman's heir. It's a good life.</p>

<p>But some nights, when the moon is full and the wolves howl in the distance, you stand at the window and wonder.</p>

<p>Kael keeps his distance, as you silently asked him to. But sometimes you see him—a shadow at the tree line, silver eyes watching. Waiting.</p>

<p>You found your grandmother's legacy. You found power, purpose, a place to belong.</p>

<p>But late at night, in the quiet hours before dawn, you can't help wondering what else you might have found... if you'd only been brave enough to reach for it.</p>

<p><em>Perhaps someday, you will be.</em></p>

<p class="ending-final"><strong>~ Until the Next Blood Moon ~</strong></p>`
    }
};

// ============================================
// GAME ENGINE
// ============================================

class BloodMoonGame {
    constructor() {
        this.state = { ...GameState };
        this.audioContext = null;
        this.currentAmbience = null;
        this.typewriterSpeed = 30;
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.createParticles();
        this.checkSavedGame();
        this.initAudio();
    }

    cacheElements() {
        // Screens
        this.screens = {
            title: document.getElementById('title-screen'),
            game: document.getElementById('game-screen'),
            ending: document.getElementById('ending-screen')
        };

        // UI Elements
        this.elements = {
            // Title
            newGameBtn: document.getElementById('new-game-btn'),
            continueBtn: document.getElementById('continue-btn'),
            soundToggle: document.getElementById('sound-toggle'),

            // Game HUD
            romanceFill: document.getElementById('romance-fill'),
            romanceValue: document.getElementById('romance-value'),
            saveBtn: document.getElementById('save-btn'),
            menuBtn: document.getElementById('menu-btn'),
            soundToggleGame: document.getElementById('sound-toggle-game'),

            // Scene
            characterPortrait: document.getElementById('character-portrait'),
            characterImage: document.getElementById('character-image'),
            characterNameBadge: document.getElementById('character-name-badge'),
            locationBadge: document.getElementById('location-badge'),
            storyText: document.getElementById('story-text'),
            choicesArea: document.getElementById('choices-area'),

            // Notifications
            notification: document.getElementById('notification'),
            notificationText: document.getElementById('notification-text'),
            saveNotification: document.getElementById('save-notification'),

            // Pause Menu
            pauseMenu: document.getElementById('pause-menu'),
            resumeBtn: document.getElementById('resume-btn'),
            saveMenuBtn: document.getElementById('save-menu-btn'),
            loadBtn: document.getElementById('load-btn'),
            quitBtn: document.getElementById('quit-btn'),

            // Ending
            endingIcon: document.getElementById('ending-icon'),
            endingTitle: document.getElementById('ending-title'),
            endingText: document.getElementById('ending-text'),
            finalRomance: document.getElementById('final-romance'),
            finalChoices: document.getElementById('final-choices'),
            playAgainBtn: document.getElementById('play-again-btn'),
            shareBtn: document.getElementById('share-btn'),

            // Effects
            particles: document.getElementById('particles')
        };
    }

    bindEvents() {
        // Title screen
        this.elements.newGameBtn.addEventListener('click', () => this.startNewGame());
        this.elements.continueBtn.addEventListener('click', () => this.loadGame());
        this.elements.soundToggle.addEventListener('click', () => this.toggleSound());

        // Game HUD
        this.elements.saveBtn.addEventListener('click', () => this.saveGame());
        this.elements.menuBtn.addEventListener('click', () => this.togglePauseMenu());
        this.elements.soundToggleGame.addEventListener('click', () => this.toggleSound());

        // Pause Menu
        this.elements.resumeBtn.addEventListener('click', () => this.togglePauseMenu());
        this.elements.saveMenuBtn.addEventListener('click', () => {
            this.saveGame();
            this.togglePauseMenu();
        });
        this.elements.loadBtn.addEventListener('click', () => {
            this.loadGame();
            this.togglePauseMenu();
        });
        this.elements.quitBtn.addEventListener('click', () => this.quitToTitle());

        // Ending screen
        this.elements.playAgainBtn.addEventListener('click', () => this.startNewGame());
        this.elements.shareBtn.addEventListener('click', () => this.shareEnding());

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.togglePauseMenu();
            if (e.key >= '1' && e.key <= '9') this.selectChoice(parseInt(e.key) - 1);
        });
    }

    // Audio system using Web Audio API
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    toggleSound() {
        this.state.soundEnabled = !this.state.soundEnabled;
        this.updateSoundIcons();

        if (this.state.soundEnabled && this.audioContext) {
            this.playAmbience();
        } else {
            this.stopAmbience();
        }
    }

    updateSoundIcons() {
        const soundOn = this.state.soundEnabled;

        // Title screen toggle
        const titleSoundOn = this.elements.soundToggle.querySelector('.sound-on');
        const titleSoundOff = this.elements.soundToggle.querySelector('.sound-off');
        if (titleSoundOn && titleSoundOff) {
            titleSoundOn.style.display = soundOn ? 'inline' : 'none';
            titleSoundOff.style.display = soundOn ? 'none' : 'inline';
        }

        // Game screen toggle
        this.elements.soundToggleGame.textContent = soundOn ? '🔊' : '🔇';
    }

    playAmbience() {
        if (!this.audioContext || !this.state.soundEnabled) return;

        // Create a simple ambient drone
        if (this.currentAmbience) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = 55; // Low A
        gainNode.gain.value = 0.05;

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start();
        this.currentAmbience = { oscillator, gainNode };
    }

    stopAmbience() {
        if (this.currentAmbience) {
            this.currentAmbience.oscillator.stop();
            this.currentAmbience = null;
        }
    }

    playNotificationSound() {
        if (!this.audioContext || !this.state.soundEnabled) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = 523.25; // C5
        gainNode.gain.value = 0.1;
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }

    // Particle system
    createParticles() {
        const container = this.elements.particles;
        const particleCount = 15;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 4) + 's';
            container.appendChild(particle);
        }
    }

    // Screen management
    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        this.screens[screenName].classList.add('active');
    }

    // Game flow
    startNewGame() {
        this.state = {
            ...GameState,
            soundEnabled: this.state.soundEnabled
        };
        this.showScreen('game');
        this.loadScene('intro');

        if (this.state.soundEnabled) {
            this.playAmbience();
        }
    }

    loadScene(sceneId) {
        const scene = StoryContent[sceneId];
        if (!scene) {
            console.error('Scene not found:', sceneId);
            return;
        }

        this.state.currentScene = sceneId;

        // Check if this is an ending
        if (scene.ending) {
            this.showEnding(scene);
            return;
        }

        // Update location
        this.elements.locationBadge.textContent = scene.location;

        // Update character portrait
        if (scene.showCharacter) {
            this.elements.characterPortrait.classList.remove('hidden');
            this.elements.characterNameBadge.textContent = scene.characterName || '';

            // Add subtle animation for character appearance
            this.elements.characterPortrait.style.animation = 'none';
            setTimeout(() => {
                this.elements.characterPortrait.style.animation = 'fadeIn 0.5s ease';
            }, 10);
        } else {
            this.elements.characterPortrait.classList.add('hidden');
        }

        // Typewriter effect for story text
        this.typewriteText(scene.text, () => {
            this.showChoices(scene.choices);
        });
    }

    typewriteText(text, callback) {
        this.elements.storyText.innerHTML = '';
        this.elements.choicesArea.innerHTML = '';

        // For HTML content, we need to handle it differently
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;

        // Just set the full HTML for now (typewriter on HTML is complex)
        // Using a fade-in effect instead
        this.elements.storyText.style.opacity = '0';
        this.elements.storyText.innerHTML = text;

        let opacity = 0;
        const fadeIn = setInterval(() => {
            opacity += 0.05;
            this.elements.storyText.style.opacity = opacity;
            if (opacity >= 1) {
                clearInterval(fadeIn);
                if (callback) setTimeout(callback, 300);
            }
        }, 20);
    }

    showChoices(choices) {
        if (!choices || choices.length === 0) return;

        this.elements.choicesArea.innerHTML = '';

        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.innerHTML = `${choice.text}${choice.hint ? `<span class="romance-hint">${choice.hint}</span>` : ''}`;

            // Stagger animation
            button.style.opacity = '0';
            button.style.transform = 'translateX(-20px)';

            setTimeout(() => {
                button.style.transition = 'all 0.4s ease';
                button.style.opacity = '1';
                button.style.transform = 'translateX(0)';
            }, index * 100);

            button.addEventListener('click', () => this.makeChoice(choice));
            this.elements.choicesArea.appendChild(button);
        });
    }

    selectChoice(index) {
        const buttons = this.elements.choicesArea.querySelectorAll('.choice-btn');
        if (buttons[index]) {
            buttons[index].click();
        }
    }

    makeChoice(choice) {
        // Record choice
        this.state.choicesMade.push({
            scene: this.state.currentScene,
            choice: choice.text,
            romanceChange: choice.romanceChange || 0
        });

        // Update romance points
        if (choice.romanceChange) {
            this.updateRomance(choice.romanceChange);
        }

        // Set flags
        if (choice.setFlag) {
            Object.assign(this.state.flags, choice.setFlag);
        }

        // Play sound
        this.playNotificationSound();

        // Load next scene
        this.loadScene(choice.nextScene);

        // Auto-save
        this.autoSave();
    }

    updateRomance(change) {
        const oldRomance = this.state.romancePoints;
        this.state.romancePoints = Math.max(0, Math.min(this.state.maxRomance, this.state.romancePoints + change));

        // Animate the meter
        const percentage = (this.state.romancePoints / this.state.maxRomance) * 100;
        this.elements.romanceFill.style.width = percentage + '%';
        this.elements.romanceValue.textContent = this.state.romancePoints;

        // Show notification for romance changes
        if (change > 0) {
            this.showNotification(`💜 +${change} Romance`);
        }
    }

    showNotification(text, duration = 2000) {
        this.elements.notificationText.textContent = text;
        this.elements.notification.classList.remove('hidden');

        setTimeout(() => {
            this.elements.notification.classList.add('hidden');
        }, duration);
    }

    // Ending system
    showEnding(scene) {
        this.showScreen('ending');
        this.stopAmbience();

        this.elements.endingIcon.textContent = scene.icon;
        this.elements.endingTitle.textContent = scene.title;
        this.elements.endingText.innerHTML = scene.text;
        this.elements.finalRomance.textContent = `${this.state.romancePoints}/${this.state.maxRomance}`;
        this.elements.finalChoices.textContent = this.state.choicesMade.length;

        // Add ending-specific styling
        const endingContent = document.querySelector('.ending-content');
        endingContent.className = 'ending-content ending-' + scene.type;

        // Clear save for this playthrough
        localStorage.removeItem('bloodMoonSave');
        this.elements.continueBtn.style.display = 'none';
    }

    shareEnding() {
        const text = `I just finished Blood Moon Shifters with ${this.state.romancePoints} romance points! 🌙💜`;

        if (navigator.share) {
            navigator.share({
                title: 'Blood Moon Shifters',
                text: text,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(text + '\n' + window.location.href).then(() => {
                alert('Copied to clipboard!');
            });
        }
    }

    // Save/Load system
    saveGame() {
        const saveData = {
            ...this.state,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };

        localStorage.setItem('bloodMoonSave', JSON.stringify(saveData));

        // Show save notification
        this.elements.saveNotification.classList.remove('hidden');
        setTimeout(() => {
            this.elements.saveNotification.classList.add('hidden');
        }, 2000);

        this.playNotificationSound();
    }

    autoSave() {
        const saveData = {
            ...this.state,
            timestamp: new Date().toISOString(),
            version: '1.0',
            auto: true
        };
        localStorage.setItem('bloodMoonAutoSave', JSON.stringify(saveData));
    }

    loadGame() {
        const saveData = localStorage.getItem('bloodMoonSave') || localStorage.getItem('bloodMoonAutoSave');

        if (!saveData) {
            alert('No saved game found!');
            return;
        }

        try {
            const parsed = JSON.parse(saveData);
            this.state = {
                ...GameState,
                ...parsed,
                soundEnabled: this.state.soundEnabled
            };

            this.showScreen('game');
            this.loadScene(this.state.currentScene);
            this.updateRomance(0); // Refresh display

            if (this.state.soundEnabled) {
                this.playAmbience();
            }
        } catch (e) {
            console.error('Failed to load save:', e);
            alert('Failed to load saved game.');
        }
    }

    checkSavedGame() {
        const saveData = localStorage.getItem('bloodMoonSave') || localStorage.getItem('bloodMoonAutoSave');
        if (saveData) {
            this.elements.continueBtn.style.display = 'block';
        }
    }

    // Menu system
    togglePauseMenu() {
        if (this.screens.game.classList.contains('active')) {
            this.elements.pauseMenu.classList.toggle('hidden');
        }
    }

    quitToTitle() {
        this.togglePauseMenu();
        this.stopAmbience();
        this.showScreen('title');
        this.checkSavedGame();
    }
}

// ============================================
// INITIALIZE GAME
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    window.game = new BloodMoonGame();
});
