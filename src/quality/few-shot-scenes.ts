// # Few-shot scene plan examples for the AI Director's Gemini prompt
// # These show the exact JSON structure the director should output
// # so Remotion can render each scene with correct props, timing, and transitions.
// #
// # Two examples:
// #   1. Three scenes from a long-form banks video (landscape 16:9)
// #   2. Five scenes from a short-form credit card video (portrait 9:16)

export const FEW_SHOT_SCENES: string = `
===== EXAMPLE 1: LONG-FORM SCENE PLAN (3 of 12 scenes shown) =====
Video: "How Banks Make $1.8 Trillion From Your Deposits"
Aspect Ratio: 16:9 (1920x1080)
FPS: 30

[
  {
    "scene_id": "scene_001",
    "segment_id": "seg_1",
    "scene_type": "BigStatReveal",
    "props": {
      "stat_value": "$1.8T",
      "stat_label": "Net Interest Income",
      "stat_sublabel": "US Commercial Banks, 2024",
      "accent_color": "#D4A853",
      "number_font": "JetBrains Mono",
      "number_size": 120,
      "label_font": "Inter",
      "label_size": 28,
      "animate_counter": true,
      "counter_start": 0,
      "counter_end": 1800000000000,
      "counter_format": "$,.1T",
      "glow_intensity": 0.6,
      "particle_count": 24,
      "background_gradient": ["#0A1628", "#0D1B2A"]
    },
    "sfx_cues": [
      { "frame": 0, "type": "whoosh" },
      { "frame": 36, "type": "bass_hit" }
    ],
    "transition_in": {
      "type": "fade",
      "duration_frames": 15
    },
    "transition_out": {
      "type": "slide_left",
      "duration_frames": 12
    },
    "start_frame": 0,
    "duration_frames": 360,
    "source_citation": {
      "text": "FDIC Quarterly Banking Profile, Q4 2024",
      "show_at_frame": 90,
      "hide_at_frame": 340,
      "position": "bottom_right"
    }
  },
  {
    "scene_id": "scene_002",
    "segment_id": "seg_2",
    "scene_type": "TextOverlay",
    "props": {
      "headline": "FRACTIONAL RESERVE BANKING",
      "headline_font": "Bebas Neue",
      "headline_size": 72,
      "headline_color": "#FFFFFF",
      "body_lines": [
        "You deposit $1,000",
        "Bank keeps $100 (10% reserve)",
        "Lends out $900",
        "That $900 creates another $810 in loans",
        "Your $1,000 becomes $10,000"
      ],
      "body_font": "Inter",
      "body_size": 28,
      "body_color": "#94A3B8",
      "highlight_words": ["$1,000", "$100", "$900", "$810", "$10,000"],
      "highlight_color": "#D4A853",
      "stagger_delay_frames": 18,
      "line_entry_animation": "slide_right",
      "background": "#0A1628"
    },
    "sfx_cues": [
      { "frame": 0, "type": "whoosh" },
      { "frame": 18, "type": "tick" },
      { "frame": 36, "type": "tick" },
      { "frame": 54, "type": "tick" },
      { "frame": 72, "type": "tick" },
      { "frame": 90, "type": "bass_hit" }
    ],
    "transition_in": {
      "type": "slide_right",
      "duration_frames": 12
    },
    "transition_out": {
      "type": "fade",
      "duration_frames": 15
    },
    "start_frame": 360,
    "duration_frames": 1650,
    "source_citation": {
      "text": "Federal Reserve Board, Regulation D",
      "show_at_frame": 420,
      "hide_at_frame": 1980,
      "position": "bottom_left"
    }
  },
  {
    "scene_id": "scene_003",
    "segment_id": "seg_3",
    "scene_type": "LineChartDraw",
    "props": {
      "title": "THE SPREAD: WHAT YOU EARN vs. WHAT THEY CHARGE",
      "title_font": "Bebas Neue",
      "title_size": 48,
      "x_axis_label": "Year",
      "y_axis_label": "Interest Rate (%)",
      "series": [
        {
          "id": "mortgage_rate",
          "label": "30-Year Mortgage Rate",
          "color": "#E74C3C",
          "data_points": [
            { "x": "2020", "y": 2.96 },
            { "x": "2021", "y": 2.98 },
            { "x": "2022", "y": 5.34 },
            { "x": "2023", "y": 6.81 },
            { "x": "2024", "y": 6.87 }
          ],
          "line_width": 3
        },
        {
          "id": "savings_rate",
          "label": "Average Savings APY",
          "color": "#2ECC71",
          "data_points": [
            { "x": "2020", "y": 0.05 },
            { "x": "2021", "y": 0.06 },
            { "x": "2022", "y": 0.17 },
            { "x": "2023", "y": 0.45 },
            { "x": "2024", "y": 0.46 }
          ],
          "line_width": 3
        }
      ],
      "spread_fill": {
        "between": ["mortgage_rate", "savings_rate"],
        "color": "rgba(212, 168, 83, 0.15)",
        "label": "Bank's Profit Margin"
      },
      "annotation": {
        "text": "6.41% SPREAD",
        "position": { "x": "2024", "y": 3.67 },
        "color": "#D4A853",
        "font": "JetBrains Mono",
        "size": 24
      },
      "grid_color": "#1B2838",
      "axis_color": "#64748B",
      "draw_speed": "smooth",
      "draw_spring": { "damping": 200, "stiffness": 100, "mass": 1 },
      "background": "#0A1628"
    },
    "sfx_cues": [
      { "frame": 0, "type": "whoosh" },
      { "frame": 45, "type": "tick" },
      { "frame": 90, "type": "tick" },
      { "frame": 120, "type": "bass_hit" }
    ],
    "transition_in": {
      "type": "scale_up",
      "duration_frames": 15
    },
    "transition_out": {
      "type": "slide_left",
      "duration_frames": 12
    },
    "start_frame": 2010,
    "duration_frames": 1440,
    "source_citation": {
      "text": "FDIC, Bankrate.com, March 2025",
      "show_at_frame": 2040,
      "hide_at_frame": 3420,
      "position": "bottom_right"
    }
  }
]


===== EXAMPLE 2: SHORT-FORM SCENE PLAN (5 scenes, complete) =====
Video: "The $400 Billion Problem Nobody Talks About"
Aspect Ratio: 9:16 (1080x1920)
FPS: 30

[
  {
    "scene_id": "scene_001",
    "segment_id": "seg_1",
    "scene_type": "BigStatReveal",
    "props": {
      "stat_value": "$400B",
      "stat_label": "Credit Card Interest",
      "stat_sublabel": "Paid by Americans in 2024",
      "accent_color": "#E74C3C",
      "number_font": "JetBrains Mono",
      "number_size": 96,
      "label_font": "Inter",
      "label_size": 22,
      "animate_counter": true,
      "counter_start": 0,
      "counter_end": 400000000000,
      "counter_format": "$,.0B",
      "glow_intensity": 0.8,
      "particle_count": 16,
      "comparison_text": "More than Thailand's GDP",
      "comparison_font": "Inter",
      "comparison_size": 18,
      "comparison_color": "#94A3B8",
      "background_gradient": ["#0A1628", "#1A0A0A"]
    },
    "sfx_cues": [
      { "frame": 0, "type": "whoosh" },
      { "frame": 30, "type": "bass_hit" }
    ],
    "transition_in": {
      "type": "scale_up",
      "duration_frames": 10
    },
    "transition_out": {
      "type": "fade",
      "duration_frames": 8
    },
    "start_frame": 0,
    "duration_frames": 240,
    "source_citation": {
      "text": "Federal Reserve G.19 Release, Q4 2024",
      "show_at_frame": 60,
      "hide_at_frame": 220,
      "position": "bottom_center"
    }
  },
  {
    "scene_id": "scene_002",
    "segment_id": "seg_2",
    "scene_type": "TextOverlay",
    "props": {
      "headline": "THE HIGHEST RATE SINCE 1994",
      "headline_font": "Bebas Neue",
      "headline_size": 56,
      "headline_color": "#FFFFFF",
      "body_lines": [
        "Average credit card APR: 24.6%",
        "Fed raised rates 11 times since 2022",
        "Issuers passed every basis point to you",
        "Rewards programs got smaller"
      ],
      "body_font": "Inter",
      "body_size": 22,
      "body_color": "#94A3B8",
      "highlight_words": ["24.6%", "11 times"],
      "highlight_color": "#E74C3C",
      "stagger_delay_frames": 15,
      "line_entry_animation": "fade_up",
      "background": "#0A1628"
    },
    "sfx_cues": [
      { "frame": 0, "type": "whoosh" },
      { "frame": 30, "type": "tick" },
      { "frame": 60, "type": "tick" }
    ],
    "transition_in": {
      "type": "slide_up",
      "duration_frames": 10
    },
    "transition_out": {
      "type": "fade",
      "duration_frames": 10
    },
    "start_frame": 240,
    "duration_frames": 540,
    "source_citation": {
      "text": "Federal Reserve, Bankrate",
      "show_at_frame": 270,
      "hide_at_frame": 760,
      "position": "bottom_center"
    }
  },
  {
    "scene_id": "scene_003",
    "segment_id": "seg_3",
    "scene_type": "CounterAnimation",
    "props": {
      "title": "TOTAL COST OF $6,500 BALANCE",
      "title_font": "Bebas Neue",
      "title_size": 48,
      "counter_start": 6500,
      "counter_end": 15900,
      "counter_format": "$,",
      "counter_font": "JetBrains Mono",
      "counter_size": 84,
      "counter_color": "#E74C3C",
      "counter_duration_frames": 90,
      "milestones": [
        { "value": 6500, "label": "Original balance", "color": "#D4A853" },
        { "value": 9400, "label": "Interest paid", "color": "#E74C3C" },
        { "value": 15900, "label": "Total cost", "color": "#E74C3C" }
      ],
      "subtitle": "Minimum payments only = 17 years",
      "subtitle_font": "Inter",
      "subtitle_size": 20,
      "subtitle_color": "#94A3B8",
      "background_gradient": ["#0A1628", "#0D1B2A"]
    },
    "sfx_cues": [
      { "frame": 0, "type": "whoosh" },
      { "frame": 15, "type": "tick" },
      { "frame": 30, "type": "tick" },
      { "frame": 45, "type": "tick" },
      { "frame": 60, "type": "tick" },
      { "frame": 90, "type": "bass_hit" }
    ],
    "transition_in": {
      "type": "fade",
      "duration_frames": 10
    },
    "transition_out": {
      "type": "slide_left",
      "duration_frames": 8
    },
    "start_frame": 780,
    "duration_frames": 660,
    "source_citation": {
      "text": "Experian Consumer Credit Review 2024",
      "show_at_frame": 810,
      "hide_at_frame": 1420,
      "position": "bottom_center"
    }
  },
  {
    "scene_id": "scene_004",
    "segment_id": "seg_4",
    "scene_type": "QuoteCard",
    "props": {
      "quote_text": "Record low delinquency: 2.1%",
      "quote_font": "Inter",
      "quote_size": 32,
      "quote_color": "#FFFFFF",
      "quote_style": "italic",
      "attribution": "— Industry talking point",
      "attribution_color": "#64748B",
      "debunk_text": "Charge-off rate: 4.2%",
      "debunk_delay_frames": 45,
      "debunk_color": "#E74C3C",
      "debunk_font": "JetBrains Mono",
      "debunk_size": 36,
      "verdict_text": "THE REAL PROBLEM IS 2x LARGER",
      "verdict_font": "Bebas Neue",
      "verdict_size": 44,
      "verdict_color": "#D4A853",
      "verdict_delay_frames": 75,
      "card_bg": "#1B2838",
      "card_border_color": "#D4A853",
      "card_border_width": 2,
      "background": "#0A1628"
    },
    "sfx_cues": [
      { "frame": 0, "type": "whoosh" },
      { "frame": 45, "type": "tick" },
      { "frame": 75, "type": "bass_hit" }
    ],
    "transition_in": {
      "type": "scale_up",
      "duration_frames": 10
    },
    "transition_out": {
      "type": "fade",
      "duration_frames": 10
    },
    "start_frame": 1440,
    "duration_frames": 600,
    "source_citation": {
      "text": "Federal Reserve Bank of New York, Household Debt Report",
      "show_at_frame": 1470,
      "hide_at_frame": 2020,
      "position": "bottom_center"
    }
  },
  {
    "scene_id": "scene_005",
    "segment_id": "seg_5",
    "scene_type": "CallToAction",
    "props": {
      "headline": "FOLLOW FOR MORE",
      "headline_font": "Bebas Neue",
      "headline_size": 56,
      "headline_color": "#D4A853",
      "subtext": "Numbers they don't put on your statement",
      "subtext_font": "Inter",
      "subtext_size": 22,
      "subtext_color": "#94A3B8",
      "action_type": "follow",
      "icon": "bell",
      "icon_color": "#D4A853",
      "icon_size": 48,
      "icon_animation": "pulse",
      "pulse_spring": { "damping": 20, "stiffness": 200, "mass": 0.5 },
      "channel_name": "@CapitalCode",
      "channel_font": "Inter",
      "channel_size": 20,
      "channel_color": "#FFFFFF",
      "background_gradient": ["#0A1628", "#0D1B2A"],
      "border_glow_color": "#D4A853",
      "border_glow_intensity": 0.4
    },
    "sfx_cues": [
      { "frame": 0, "type": "whoosh" }
    ],
    "transition_in": {
      "type": "slide_up",
      "duration_frames": 10
    },
    "transition_out": {
      "type": "fade",
      "duration_frames": 15
    },
    "start_frame": 2040,
    "duration_frames": 210,
    "source_citation": null
  }
]
`
