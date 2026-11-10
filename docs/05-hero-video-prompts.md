# Hero video — generation prompts

The hero shows a **short silent loop** (like a moving photograph). Clicking it, or "Watch the demo", opens the **full video** with controls.
Generate in ChatGPT (Sora) or Google Flow (Veo). Flow makes 8-second shots, so the full video is written as shots you chain in Flow's Scenebuilder.

## Deliverables

| File | What | Spec |
|---|---|---|
| `src/assets/videos/hero-loop.mp4` | Silent seamless loop | 16:9, 1920×1080, 6–8 s, H.264 MP4, no audio, **≤ 4 MB** |
| `src/assets/videos/hero-full.mp4` | Full video | 16:9, 1920×1080, 20–40 s, H.264 MP4, music/ambient audio ok, **≤ 25 MB** |

Drop the files at those paths and the hero picks them up automatically. Until then it shows `public/images/hero-poster.jpg`.

**Use MP4, not GIF.** A GIF of the same clip is 10–20× heavier and looks banded. If a tool only exports GIF, send that and I'll convert it.

**Framing:** the hero crops the video to a wide band (about 2.2:1) on desktop and to 4:3 on mobile. Keep the person and the action **in the centre third**, with nothing important near the top or bottom edges.

## Rules for every prompt (paste at the end)

```
Style: photorealistic, natural documentary look, warm soft morning daylight from a window, shallow depth of field, gentle film grain, true-to-life skin tones, calm and optimistic mood. Slow, steady camera; no fast cuts, no shaky cam.
Setting: a small home studio in a Dhaka apartment — window with iron grill, potted pothos plants, wooden shelves with kraft-paper parcels, a wooden work table.
Avoid: any text, letters, numbers, subtitles or watermarks; any logos or brand marks (no card, bank, wallet, courier or social-media logos); readable phone or laptop screens (screens show only a soft blurred glow); distorted hands or extra fingers; looking into the camera.
```

## Prompt A — hero loop (silent, 8 s, seamless)

```
A young Bangladeshi woman in her late twenties, wearing a floral cotton salwar kameez and a plum-coloured dupatta, runs her small clothing business from home. She sits at a wooden table, smiles at her laptop, then turns to a kraft-paper parcel beside it, presses a strip of tape across the lid and smooths it with her palm, and looks back to the laptop. Folded printed cotton fabrics are stacked at the left of the table; a phone lies face up on the right and its screen softly lights up once. A clothes rail with colourful kameez hangs behind her.
Camera: locked-off medium-wide shot at table height with a very slow push-in, subject centred.
Make it a seamless loop: the last frame matches the first frame (same pose, same camera position), so the clip can repeat without a visible jump.
Duration 8 seconds, 16:9, no audio.
[paste the rules block]
```

## Prompt B — full video (chain these shots, 8 s each)

**Shot 1 — the product.**
```
Close-up: the same young Bangladeshi woman photographs a folded printed cotton kameez on a wooden table with her phone, adjusting the fabric with one hand. Soft window light. Slow lateral camera move. 8 seconds, 16:9.
[rules block]
```

**Shot 2 — orders come in.**
```
Medium shot: she sits at her laptop and smiles as the screen glows softly (screen not readable); her phone beside the laptop lights up twice. She nods to herself and reaches for a notebook. Slow push-in. 8 seconds, 16:9.
[rules block]
```

**Shot 3 — packing.**
```
Close-up on hands: she folds a kameez into tissue paper, places it in a kraft-paper box, tapes it shut and ties it with jute twine. Warm light, shallow depth of field. 8 seconds, 16:9.
[rules block]
```

**Shot 4 — pickup.**
```
At the apartment door: she hands two kraft parcels to a delivery rider in a plain red jacket and helmet (no logos). They exchange a friendly nod; he turns to leave down the stairwell. Medium-wide shot, natural light. 8 seconds, 16:9.
[rules block]
```

**Shot 5 — delivered (optional).**
```
A smiling customer, a Bangladeshi woman in her forties, opens a kraft parcel at her home and lifts out the printed kameez, holding it up to the light. Medium shot, warm interior light. 8 seconds, 16:9.
[rules block]
```

Audio for the full video (optional, in Flow or added later): soft acoustic background music with light room ambience; no voice-over.

## Variant — a second seller (optional)

To show the platform isn't only for clothing, you can swap Prompt A's seller for:
```
A Bangladeshi man in his thirties in a plain cotton shirt runs a small organic grocery business from home: jars of honey and ghee and bags of red rice on shelves behind him. He seals a box of jars, sets it on a stack of parcels and checks his phone, which softly lights up.
```

## After you generate

- Watch the loop's join (last frame → first frame). If it jumps, trim it, or ask me and I'll make a ping-pong loop.
- Send the files, or drop them at the paths above. I'll set the poster from the loop's first frame so the still and the video match.
