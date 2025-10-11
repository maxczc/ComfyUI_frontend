import type { ComfyWorkflowJSON } from '@/platform/workflow/validation/schemas/workflowSchema'

export const defaultGraph: ComfyWorkflowJSON = {
  "id": "206247b6-9fec-4ed2-8927-e4f388c674d4",
  "revision": 0,
  "last_node_id": 87,
  "last_link_id": 122,
  "nodes": [
    {
      "id": 11,
      "type": "LoadWanVideoT5TextEncoder",
      "pos": [
        -270,
        -770
      ],
      "size": [
        377.1661376953125,
        130
      ],
      "flags": {},
      "order": 0,
      "mode": 0,
      "inputs": [],
      "outputs": [
        {
          "label": "wan_t5_model",
          "name": "wan_t5_model",
          "type": "WANTEXTENCODER",
          "slot_index": 0,
          "links": [
            15
          ]
        }
      ],
      "properties": {
        "Node name for S&R": "LoadWanVideoT5TextEncoder",
        "cnr_id": "ComfyUI-WanVideoWrapper",
        "ver": "d9b1f4d1a5aea91d101ae97a54714a5861af3f50",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "umt5-xxl-enc-bf16.safetensors",
        "bf16",
        "offload_device",
        "disabled"
      ],
      "color": "#332922",
      "bgcolor": "#593930"
    },
    {
      "id": 28,
      "type": "WanVideoDecode",
      "pos": [
        520,
        260
      ],
      "size": [
        315,
        198
      ],
      "flags": {},
      "order": 35,
      "mode": 0,
      "inputs": [
        {
          "label": "vae",
          "name": "vae",
          "type": "WANVAE",
          "link": 118
        },
        {
          "label": "samples",
          "name": "samples",
          "type": "LATENT",
          "link": 90
        }
      ],
      "outputs": [
        {
          "label": "images",
          "name": "images",
          "type": "IMAGE",
          "slot_index": 0,
          "links": [
            36
          ]
        }
      ],
      "properties": {
        "Node name for S&R": "WanVideoDecode",
        "cnr_id": "ComfyUI-WanVideoWrapper",
        "ver": "d9b1f4d1a5aea91d101ae97a54714a5861af3f50",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        false,
        272,
        272,
        144,
        128,
        "default"
      ],
      "color": "#322",
      "bgcolor": "#533"
    },
    {
      "id": 33,
      "type": "Note",
      "pos": [
        -410,
        -1450
      ],
      "size": [
        359.0753479003906,
        88
      ],
      "flags": {},
      "order": 1,
      "mode": 0,
      "inputs": [],
      "outputs": [],
      "properties": {
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "Models:\nhttps://huggingface.co/Kijai/WanVideo_comfy/tree/main"
      ],
      "color": "#432",
      "bgcolor": "#653"
    },
    {
      "id": 35,
      "type": "WanVideoTorchCompileSettings",
      "pos": [
        -860,
        -1460
      ],
      "size": [
        421.6000061035156,
        202
      ],
      "flags": {},
      "order": 2,
      "mode": 0,
      "inputs": [],
      "outputs": [
        {
          "label": "torch_compile_args",
          "name": "torch_compile_args",
          "type": "WANCOMPILEARGS",
          "slot_index": 0,
          "links": []
        }
      ],
      "properties": {
        "Node name for S&R": "WanVideoTorchCompileSettings",
        "cnr_id": "ComfyUI-WanVideoWrapper",
        "ver": "d9b1f4d1a5aea91d101ae97a54714a5861af3f50",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "inductor",
        false,
        "default",
        false,
        64,
        true,
        128
      ],
      "color": "#223",
      "bgcolor": "#335"
    },
    {
      "id": 36,
      "type": "Note",
      "pos": [
        -400,
        -1310
      ],
      "size": [
        374.3061828613281,
        171.9547576904297
      ],
      "flags": {},
      "order": 3,
      "mode": 0,
      "inputs": [],
      "outputs": [],
      "properties": {
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "fp8_fast seems to cause huge quality degradation\n\nfp_16_fast enables \"Full FP16 Accmumulation in FP16 GEMMs\" feature available in the very latest pytorch nightly, this is around 20% speed boost. \n\nSageattn if you have it installed can be used for almost double inference speed"
      ],
      "color": "#432",
      "bgcolor": "#653"
    },
    {
      "id": 39,
      "type": "WanVideoBlockSwap",
      "pos": [
        -820,
        -1200
      ],
      "size": [
        315,
        202
      ],
      "flags": {},
      "order": 4,
      "mode": 0,
      "inputs": [],
      "outputs": [
        {
          "label": "block_swap_args",
          "name": "block_swap_args",
          "type": "BLOCKSWAPARGS",
          "slot_index": 0,
          "links": [
            96
          ]
        }
      ],
      "properties": {
        "Node name for S&R": "WanVideoBlockSwap",
        "cnr_id": "ComfyUI-WanVideoWrapper",
        "ver": "d9b1f4d1a5aea91d101ae97a54714a5861af3f50",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        15,
        false,
        false,
        true,
        0,
        0,
        false
      ],
      "color": "#223",
      "bgcolor": "#335"
    },
    {
      "id": 42,
      "type": "Note",
      "pos": [
        -1160,
        -1190
      ],
      "size": [
        314.96246337890625,
        152.77333068847656
      ],
      "flags": {},
      "order": 5,
      "mode": 0,
      "inputs": [],
      "outputs": [],
      "properties": {
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "Adjust the blocks to swap based on your VRAM, this is a tradeoff between speed and memory usage.\n\nAlternatively there's option to use VRAM management introduced in DiffSynt-Studios. This is usually slower, but saves even more VRAM compared to BlockSwap"
      ],
      "color": "#432",
      "bgcolor": "#653"
    },
    {
      "id": 44,
      "type": "Note",
      "pos": [
        -1180,
        -1470
      ],
      "size": [
        303.0501403808594,
        88
      ],
      "flags": {},
      "order": 6,
      "mode": 0,
      "inputs": [],
      "outputs": [],
      "properties": {
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "If you have Triton installed, connect this for ~30% speed increase"
      ],
      "color": "#432",
      "bgcolor": "#653"
    },
    {
      "id": 45,
      "type": "WanVideoVRAMManagement",
      "pos": [
        -820,
        -1010
      ],
      "size": [
        315,
        58
      ],
      "flags": {},
      "order": 7,
      "mode": 0,
      "inputs": [],
      "outputs": [
        {
          "label": "vram_management_args",
          "name": "vram_management_args",
          "type": "VRAM_MANAGEMENTARGS",
          "links": []
        }
      ],
      "properties": {
        "Node name for S&R": "WanVideoVRAMManagement",
        "cnr_id": "ComfyUI-WanVideoWrapper",
        "ver": "d9b1f4d1a5aea91d101ae97a54714a5861af3f50",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        1
      ],
      "color": "#223",
      "bgcolor": "#335"
    },
    {
      "id": 52,
      "type": "WanVideoTeaCache",
      "pos": [
        490,
        -50
      ],
      "size": [
        315,
        178
      ],
      "flags": {},
      "order": 8,
      "mode": 0,
      "inputs": [],
      "outputs": [
        {
          "label": "teacache_args",
          "name": "cache_args",
          "type": "CACHEARGS",
          "links": [
            89
          ]
        }
      ],
      "properties": {
        "Node name for S&R": "WanVideoTeaCache",
        "cnr_id": "ComfyUI-WanVideoWrapper",
        "ver": "d9b1f4d1a5aea91d101ae97a54714a5861af3f50",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        0.225,
        6,
        -1,
        "offload_device",
        "true",
        "e"
      ]
    },
    {
      "id": 63,
      "type": "WanVideoImageToVideoEncode",
      "pos": [
        -330,
        -380
      ],
      "size": [
        352.79998779296875,
        390
      ],
      "flags": {},
      "order": 33,
      "mode": 0,
      "inputs": [
        {
          "label": "vae",
          "name": "vae",
          "shape": 7,
          "type": "WANVAE",
          "link": 119
        },
        {
          "label": "clip_embeds",
          "name": "clip_embeds",
          "shape": 7,
          "type": "WANVIDIMAGE_CLIPEMBEDS",
          "link": 82
        },
        {
          "label": "start_image",
          "name": "start_image",
          "shape": 7,
          "type": "IMAGE",
          "link": 108
        },
        {
          "label": "end_image",
          "name": "end_image",
          "shape": 7,
          "type": "IMAGE",
          "link": null
        },
        {
          "label": "control_embeds",
          "name": "control_embeds",
          "shape": 7,
          "type": "WANVIDIMAGE_EMBEDS",
          "link": null
        },
        {
          "label": "temporal_mask",
          "name": "temporal_mask",
          "shape": 7,
          "type": "MASK",
          "link": null
        },
        {
          "label": "extra_latents",
          "name": "extra_latents",
          "shape": 7,
          "type": "LATENT",
          "link": null
        },
        {
          "name": "add_cond_latents",
          "shape": 7,
          "type": "ADD_COND_LATENTS",
          "link": null
        },
        {
          "label": "width",
          "name": "width",
          "type": "INT",
          "widget": {
            "name": "width"
          },
          "link": 109
        },
        {
          "label": "height",
          "name": "height",
          "type": "INT",
          "widget": {
            "name": "height"
          },
          "link": 110
        },
        {
          "label": "num_frames",
          "name": "num_frames",
          "type": "INT",
          "widget": {
            "name": "num_frames"
          },
          "link": 111
        }
      ],
      "outputs": [
        {
          "label": "image_embeds",
          "name": "image_embeds",
          "type": "WANVIDIMAGE_EMBEDS",
          "links": [
            87
          ]
        }
      ],
      "properties": {
        "Node name for S&R": "WanVideoImageToVideoEncode",
        "cnr_id": "ComfyUI-WanVideoWrapper",
        "ver": "d9b1f4d1a5aea91d101ae97a54714a5861af3f50",
        "widget_ue_connectable": {
          "width": true,
          "height": true,
          "num_frames": true
        }
      },
      "widgets_values": [
        832,
        480,
        81,
        0.030000000000000006,
        1,
        1,
        true,
        false,
        false
      ],
      "color": "#2a363b",
      "bgcolor": "#3f5159"
    },
    {
      "id": 65,
      "type": "WanVideoClipVisionEncode",
      "pos": [
        -720,
        -330
      ],
      "size": [
        327.5999755859375,
        262
      ],
      "flags": {},
      "order": 29,
      "mode": 0,
      "inputs": [
        {
          "label": "clip_vision",
          "name": "clip_vision",
          "type": "CLIP_VISION",
          "link": 70
        },
        {
          "label": "image_1",
          "name": "image_1",
          "type": "IMAGE",
          "link": 107
        },
        {
          "label": "image_2",
          "name": "image_2",
          "shape": 7,
          "type": "IMAGE",
          "link": null
        },
        {
          "label": "negative_image",
          "name": "negative_image",
          "shape": 7,
          "type": "IMAGE",
          "link": null
        }
      ],
      "outputs": [
        {
          "label": "image_embeds",
          "name": "image_embeds",
          "type": "WANVIDIMAGE_CLIPEMBEDS",
          "links": [
            82
          ]
        }
      ],
      "properties": {
        "Node name for S&R": "WanVideoClipVisionEncode",
        "cnr_id": "ComfyUI-WanVideoWrapper",
        "ver": "d9b1f4d1a5aea91d101ae97a54714a5861af3f50",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        1,
        1,
        "center",
        "average",
        true,
        0,
        0.20000000000000004
      ],
      "color": "#233",
      "bgcolor": "#355"
    },
    {
      "id": 69,
      "type": "WanVideoSampler",
      "pos": [
        950,
        -370
      ],
      "size": [
        317.4000244140625,
        869.4000244140625
      ],
      "flags": {},
      "order": 34,
      "mode": 0,
      "inputs": [
        {
          "label": "model",
          "name": "model",
          "type": "WANVIDEOMODEL",
          "link": 85
        },
        {
          "label": "image_embeds",
          "name": "image_embeds",
          "type": "WANVIDIMAGE_EMBEDS",
          "link": 87
        },
        {
          "label": "text_embeds",
          "name": "text_embeds",
          "shape": 7,
          "type": "WANVIDEOTEXTEMBEDS",
          "link": 86
        },
        {
          "label": "samples",
          "name": "samples",
          "shape": 7,
          "type": "LATENT",
          "link": null
        },
        {
          "label": "feta_args",
          "name": "feta_args",
          "shape": 7,
          "type": "FETAARGS",
          "link": null
        },
        {
          "label": "context_options",
          "name": "context_options",
          "shape": 7,
          "type": "WANVIDCONTEXT",
          "link": null
        },
        {
          "name": "cache_args",
          "shape": 7,
          "type": "CACHEARGS",
          "link": null
        },
        {
          "label": "flowedit_args",
          "name": "flowedit_args",
          "shape": 7,
          "type": "FLOWEDITARGS",
          "link": null
        },
        {
          "label": "slg_args",
          "name": "slg_args",
          "shape": 7,
          "type": "SLGARGS",
          "link": null
        },
        {
          "label": "loop_args",
          "name": "loop_args",
          "shape": 7,
          "type": "LOOPARGS",
          "link": null
        },
        {
          "label": "experimental_args",
          "name": "experimental_args",
          "shape": 7,
          "type": "EXPERIMENTALARGS",
          "link": null
        },
        {
          "label": "sigmas",
          "name": "sigmas",
          "shape": 7,
          "type": "SIGMAS",
          "link": null
        },
        {
          "label": "unianimate_poses",
          "name": "unianimate_poses",
          "shape": 7,
          "type": "UNIANIMATE_POSE",
          "link": null
        },
        {
          "label": "fantasytalking_embeds",
          "name": "fantasytalking_embeds",
          "shape": 7,
          "type": "FANTASYTALKING_EMBEDS",
          "link": 101
        },
        {
          "name": "uni3c_embeds",
          "shape": 7,
          "type": "UNI3C_EMBEDS",
          "link": null
        },
        {
          "name": "multitalk_embeds",
          "shape": 7,
          "type": "MULTITALK_EMBEDS",
          "link": null
        },
        {
          "name": "freeinit_args",
          "shape": 7,
          "type": "FREEINITARGS",
          "link": null
        },
        {
          "label": "steps",
          "name": "steps",
          "type": "INT",
          "widget": {
            "name": "steps"
          },
          "link": 115
        },
        {
          "label": "teacache_args",
          "name": "teacache_args",
          "shape": 7,
          "type": "TEACACHEARGS",
          "link": 89
        }
      ],
      "outputs": [
        {
          "label": "samples",
          "name": "samples",
          "type": "LATENT",
          "links": [
            90
          ]
        },
        {
          "name": "denoised_samples",
          "type": "LATENT",
          "links": null
        }
      ],
      "properties": {
        "Node name for S&R": "WanVideoSampler",
        "cnr_id": "ComfyUI-WanVideoWrapper",
        "ver": "df95c85283d7625fbdf664d0133a2e1c114ba14a",
        "widget_ue_connectable": {
          "steps": true
        }
      },
      "widgets_values": [
        30,
        5.000000000000001,
        5,
        0,
        "fixed",
        true,
        "unipc",
        0,
        1,
        false,
        "comfy",
        0,
        -1,
        false
      ]
    },
    {
      "id": 71,
      "type": "DownloadAndLoadWav2VecModel",
      "pos": [
        -760,
        -760
      ],
      "size": [
        355.20001220703125,
        106
      ],
      "flags": {},
      "order": 9,
      "mode": 0,
      "inputs": [],
      "outputs": [
        {
          "label": "wav2vec_model",
          "name": "wav2vec_model",
          "type": "WAV2VECMODEL",
          "links": [
            99
          ]
        }
      ],
      "properties": {
        "Node name for S&R": "DownloadAndLoadWav2VecModel",
        "cnr_id": "ComfyUI-WanVideoWrapper",
        "ver": "df95c85283d7625fbdf664d0133a2e1c114ba14a",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "facebook/wav2vec2-base-960h",
        "fp16",
        "main_device"
      ],
      "color": "#323",
      "bgcolor": "#535"
    },
    {
      "id": 73,
      "type": "FantasyTalkingWav2VecEmbeds",
      "pos": [
        60,
        230
      ],
      "size": [
        400,
        170
      ],
      "flags": {},
      "order": 32,
      "mode": 0,
      "inputs": [
        {
          "label": "wav2vec_model",
          "name": "wav2vec_model",
          "type": "WAV2VECMODEL",
          "link": 99
        },
        {
          "label": "fantasytalking_model",
          "name": "fantasytalking_model",
          "type": "FANTASYTALKINGMODEL",
          "link": 100
        },
        {
          "label": "audio",
          "name": "audio",
          "type": "AUDIO",
          "link": 121
        },
        {
          "label": "num_frames",
          "name": "num_frames",
          "type": "INT",
          "widget": {
            "name": "num_frames"
          },
          "link": 112
        },
        {
          "label": "audio_cfg_scale",
          "name": "audio_cfg_scale",
          "type": "FLOAT",
          "widget": {
            "name": "audio_cfg_scale"
          },
          "link": 113
        }
      ],
      "outputs": [
        {
          "label": "fantasytalking_embeds",
          "name": "fantasytalking_embeds",
          "type": "FANTASYTALKING_EMBEDS",
          "links": [
            101
          ]
        }
      ],
      "properties": {
        "Node name for S&R": "FantasyTalkingWav2VecEmbeds",
        "cnr_id": "ComfyUI-WanVideoWrapper",
        "ver": "df95c85283d7625fbdf664d0133a2e1c114ba14a",
        "widget_ue_connectable": {
          "num_frames": true,
          "audio_cfg_scale": true
        }
      },
      "widgets_values": [
        81,
        23,
        1,
        1
      ],
      "color": "#323",
      "bgcolor": "#535"
    },
    {
      "id": 74,
      "type": "ImageResizeKJv2",
      "pos": [
        -720,
        20
      ],
      "size": [
        315,
        336
      ],
      "flags": {},
      "order": 25,
      "mode": 0,
      "inputs": [
        {
          "label": "image",
          "name": "image",
          "type": "IMAGE",
          "link": 104
        },
        {
          "name": "mask",
          "shape": 7,
          "type": "MASK",
          "link": null
        }
      ],
      "outputs": [
        {
          "label": "IMAGE",
          "name": "IMAGE",
          "type": "IMAGE",
          "links": [
            107,
            108,
            116
          ]
        },
        {
          "label": "width",
          "name": "width",
          "type": "INT",
          "links": [
            109
          ]
        },
        {
          "label": "height",
          "name": "height",
          "type": "INT",
          "links": [
            110
          ]
        },
        {
          "name": "mask",
          "type": "MASK",
          "links": null
        }
      ],
      "properties": {
        "Node name for S&R": "ImageResizeKJv2",
        "cnr_id": "comfyui-kjnodes",
        "ver": "c3dc82108a2a86c17094107ead61d63f8c76200e",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        512,
        512,
        "lanczos",
        "crop",
        "0, 0, 0",
        "center",
        2,
        "cpu"
      ],
      "color": "#2a363b",
      "bgcolor": "#3f5159"
    },
    {
      "id": 75,
      "type": "INTConstant",
      "pos": [
        70,
        -280
      ],
      "size": [
        210,
        58
      ],
      "flags": {},
      "order": 10,
      "mode": 0,
      "inputs": [],
      "outputs": [
        {
          "label": "值",
          "name": "value",
          "type": "INT",
          "links": [
            111,
            112
          ]
        }
      ],
      "properties": {
        "Node name for S&R": "INTConstant",
        "cnr_id": "comfyui-kjnodes",
        "ver": "c3dc82108a2a86c17094107ead61d63f8c76200e",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        116
      ],
      "color": "#1b4669",
      "bgcolor": "#29699c"
    },
    {
      "id": 76,
      "type": "MarkdownNote",
      "pos": [
        -1160,
        -600
      ],
      "size": [
        446.07086181640625,
        88
      ],
      "flags": {},
      "order": 11,
      "mode": 0,
      "inputs": [],
      "outputs": [],
      "title": "Model link",
      "properties": {
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "[https://huggingface.co/Kijai/WanVideo_comfy/blob/main/fantasytalking_fp16.safetensors](https://huggingface.co/Kijai/WanVideo_comfy/blob/main/fantasytalking_fp16.safetensors)"
      ],
      "color": "#432",
      "bgcolor": "#653"
    },
    {
      "id": 77,
      "type": "Note",
      "pos": [
        -1160,
        -800
      ],
      "size": [
        373.65032958984375,
        139.77639770507812
      ],
      "flags": {},
      "order": 12,
      "mode": 0,
      "inputs": [],
      "outputs": [],
      "properties": {
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "Wave2vec modele is autodownloaded from:\n\nhttps://huggingface.co/facebook/wav2vec2-base-960h\n\nto:\n\nComfyUI/models/transformers/facebook/wav2vec2-base-960h\n\nThe .safetensor file + config files"
      ],
      "color": "#432",
      "bgcolor": "#653"
    },
    {
      "id": 78,
      "type": "CreateCFGScheduleFloatList",
      "pos": [
        60,
        -140
      ],
      "size": [
        403.1999816894531,
        178
      ],
      "flags": {},
      "order": 24,
      "mode": 0,
      "inputs": [
        {
          "label": "steps",
          "name": "steps",
          "type": "INT",
          "widget": {
            "name": "steps"
          },
          "link": 114
        }
      ],
      "outputs": [
        {
          "label": "float_list",
          "name": "float_list",
          "type": "FLOAT",
          "links": [
            113
          ]
        }
      ],
      "properties": {
        "Node name for S&R": "CreateCFGScheduleFloatList",
        "cnr_id": "ComfyUI-WanVideoWrapper",
        "ver": "e3afc7fc758add9ba0ca7e6e219c30f312758484",
        "widget_ue_connectable": {
          "steps": true
        }
      },
      "widgets_values": [
        30,
        5,
        5,
        "linear",
        0,
        0.1
      ]
    },
    {
      "id": 79,
      "type": "INTConstant",
      "pos": [
        70,
        -390
      ],
      "size": [
        210,
        58
      ],
      "flags": {},
      "order": 13,
      "mode": 0,
      "inputs": [],
      "outputs": [
        {
          "label": "值",
          "name": "value",
          "type": "INT",
          "links": [
            114,
            115
          ]
        }
      ],
      "properties": {
        "Node name for S&R": "INTConstant",
        "cnr_id": "comfyui-kjnodes",
        "ver": "c3dc82108a2a86c17094107ead61d63f8c76200e",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        30
      ],
      "color": "#1b4669",
      "bgcolor": "#29699c"
    },
    {
      "id": 81,
      "type": "SetNode",
      "pos": [
        -210,
        -540
      ],
      "size": [
        210,
        60
      ],
      "flags": {
        "collapsed": false
      },
      "order": 27,
      "mode": 0,
      "inputs": [
        {
          "name": "WANVAE",
          "type": "WANVAE",
          "link": 117
        }
      ],
      "outputs": [
        {
          "label": "输出",
          "name": "*",
          "type": "*",
          "links": null
        }
      ],
      "title": "Set_WANVAE",
      "properties": {
        "previousName": "WanVAE",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "WanVAE"
      ],
      "color": "#322",
      "bgcolor": "#533"
    },
    {
      "id": 82,
      "type": "GetNode",
      "pos": [
        540,
        200
      ],
      "size": [
        210,
        60
      ],
      "flags": {
        "collapsed": true
      },
      "order": 14,
      "mode": 0,
      "inputs": [],
      "outputs": [
        {
          "name": "WANVAE",
          "type": "WANVAE",
          "links": [
            118
          ]
        }
      ],
      "title": "WanVAE",
      "properties": {
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "WanVAE"
      ],
      "color": "#322",
      "bgcolor": "#533"
    },
    {
      "id": 83,
      "type": "GetNode",
      "pos": [
        -570,
        -390
      ],
      "size": [
        210,
        34
      ],
      "flags": {
        "collapsed": true
      },
      "order": 15,
      "mode": 0,
      "inputs": [],
      "outputs": [
        {
          "name": "WANVAE",
          "type": "WANVAE",
          "links": [
            119
          ]
        }
      ],
      "title": "WanVAE",
      "properties": {
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "WanVAE"
      ],
      "color": "#322",
      "bgcolor": "#533"
    },
    {
      "id": 84,
      "type": "SetNode",
      "pos": [
        -720,
        -390
      ],
      "size": [
        210,
        60
      ],
      "flags": {
        "collapsed": true
      },
      "order": 28,
      "mode": 0,
      "inputs": [
        {
          "name": "AUDIO",
          "type": "AUDIO",
          "link": 120
        }
      ],
      "outputs": [
        {
          "name": "AUDIO",
          "type": "AUDIO",
          "links": [
            121
          ]
        }
      ],
      "title": "Set_AUDIO",
      "properties": {
        "previousName": "InputAudio",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "InputAudio"
      ],
      "color": "#323",
      "bgcolor": "#535"
    },
    {
      "id": 85,
      "type": "GetNode",
      "pos": [
        330,
        -260
      ],
      "size": [
        210,
        60
      ],
      "flags": {
        "collapsed": true
      },
      "order": 16,
      "mode": 0,
      "inputs": [],
      "outputs": [
        {
          "name": "AUDIO",
          "type": "AUDIO",
          "links": [
            122
          ]
        }
      ],
      "title": "InputAudio",
      "properties": {
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "InputAudio"
      ],
      "color": "#323",
      "bgcolor": "#535"
    },
    {
      "id": 86,
      "type": "Note",
      "pos": [
        50,
        90
      ],
      "size": [
        410.2611389160156,
        90.62958526611328
      ],
      "flags": {},
      "order": 17,
      "mode": 0,
      "inputs": [],
      "outputs": [],
      "properties": {
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "Applying the audio_cfg only at the beginning can give most of it's benefit while not slowing down rest of the generation."
      ],
      "color": "#432",
      "bgcolor": "#653"
    },
    {
      "id": 58,
      "type": "LoadImage",
      "pos": [
        -1170,
        -110
      ],
      "size": [
        413.10479736328125,
        498.3180847167969
      ],
      "flags": {},
      "order": 18,
      "mode": 0,
      "inputs": [],
      "outputs": [
        {
          "label": "图像",
          "name": "IMAGE",
          "type": "IMAGE",
          "links": [
            104
          ]
        },
        {
          "label": "遮罩",
          "name": "MASK",
          "type": "MASK",
          "links": null
        }
      ],
      "properties": {
        "Node name for S&R": "LoadImage",
        "cnr_id": "comfy-core",
        "ver": "0.3.26",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "avatar.png",
        "image"
      ],
      "color": "#2a363b",
      "bgcolor": "#3f5159"
    },
    {
      "id": 68,
      "type": "FantasyTalkingModelLoader",
      "pos": [
        -690,
        -590
      ],
      "size": [
        340.20001220703125,
        82
      ],
      "flags": {},
      "order": 19,
      "mode": 0,
      "inputs": [],
      "outputs": [
        {
          "label": "model",
          "name": "model",
          "type": "FANTASYTALKINGMODEL",
          "links": [
            84,
            100
          ]
        }
      ],
      "properties": {
        "Node name for S&R": "FantasyTalkingModelLoader",
        "cnr_id": "ComfyUI-WanVideoWrapper",
        "ver": "df95c85283d7625fbdf664d0133a2e1c114ba14a",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "fantasytalking_fp16.safetensors",
        "fp16"
      ],
      "color": "#323",
      "bgcolor": "#535"
    },
    {
      "id": 38,
      "type": "WanVideoVAELoader",
      "pos": [
        -760,
        -890
      ],
      "size": [
        372.7727966308594,
        82
      ],
      "flags": {},
      "order": 20,
      "mode": 0,
      "inputs": [
        {
          "name": "compile_args",
          "shape": 7,
          "type": "WANCOMPILEARGS",
          "link": null
        }
      ],
      "outputs": [
        {
          "label": "vae",
          "name": "vae",
          "type": "WANVAE",
          "slot_index": 0,
          "links": [
            117
          ]
        }
      ],
      "properties": {
        "Node name for S&R": "WanVideoVAELoader",
        "cnr_id": "ComfyUI-WanVideoWrapper",
        "ver": "d9b1f4d1a5aea91d101ae97a54714a5861af3f50",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "wan_2.1_vae.safetensors",
        "bf16"
      ],
      "color": "#322",
      "bgcolor": "#533"
    },
    {
      "id": 59,
      "type": "CLIPVisionLoader",
      "pos": [
        -1150,
        -920
      ],
      "size": [
        315,
        58
      ],
      "flags": {},
      "order": 21,
      "mode": 0,
      "inputs": [],
      "outputs": [
        {
          "label": "CLIP视觉",
          "name": "CLIP_VISION",
          "type": "CLIP_VISION",
          "links": [
            70
          ]
        }
      ],
      "properties": {
        "Node name for S&R": "CLIPVisionLoader",
        "cnr_id": "comfy-core",
        "ver": "0.3.26",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "clip_vision_h.safetensors"
      ],
      "color": "#233",
      "bgcolor": "#355"
    },
    {
      "id": 22,
      "type": "WanVideoModelLoader",
      "pos": [
        -360,
        -1070
      ],
      "size": [
        477.4410095214844,
        338
      ],
      "flags": {},
      "order": 26,
      "mode": 0,
      "inputs": [
        {
          "label": "compile_args",
          "name": "compile_args",
          "shape": 7,
          "type": "WANCOMPILEARGS",
          "link": null
        },
        {
          "label": "block_swap_args",
          "name": "block_swap_args",
          "shape": 7,
          "type": "BLOCKSWAPARGS",
          "link": 96
        },
        {
          "label": "lora",
          "name": "lora",
          "shape": 7,
          "type": "WANVIDLORA",
          "link": null
        },
        {
          "label": "vram_management_args",
          "name": "vram_management_args",
          "shape": 7,
          "type": "VRAM_MANAGEMENTARGS",
          "link": null
        },
        {
          "name": "extra_model",
          "shape": 7,
          "type": "VACEPATH",
          "link": null
        },
        {
          "label": "fantasytalking_model",
          "name": "fantasytalking_model",
          "shape": 7,
          "type": "FANTASYTALKINGMODEL",
          "link": 84
        },
        {
          "name": "multitalk_model",
          "shape": 7,
          "type": "MULTITALKMODEL",
          "link": null
        },
        {
          "name": "fantasyportrait_model",
          "shape": 7,
          "type": "FANTASYPORTRAITMODEL",
          "link": null
        },
        {
          "label": "vace_model",
          "name": "vace_model",
          "shape": 7,
          "type": "VACEPATH",
          "link": null
        }
      ],
      "outputs": [
        {
          "label": "model",
          "name": "model",
          "type": "WANVIDEOMODEL",
          "slot_index": 0,
          "links": [
            79,
            85
          ]
        }
      ],
      "properties": {
        "Node name for S&R": "WanVideoModelLoader",
        "cnr_id": "ComfyUI-WanVideoWrapper",
        "ver": "d9b1f4d1a5aea91d101ae97a54714a5861af3f50",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "wan2.1_i2v_720p_14B_fp8_e4m3fn.safetensors",
        "fp16",
        "fp8_e4m3fn",
        "offload_device",
        "sdpa",
        "default"
      ],
      "color": "#223",
      "bgcolor": "#335"
    },
    {
      "id": 16,
      "type": "WanVideoTextEncode",
      "pos": [
        490,
        -380
      ],
      "size": [
        420.30511474609375,
        261.5306701660156
      ],
      "flags": {},
      "order": 31,
      "mode": 0,
      "inputs": [
        {
          "label": "t5",
          "name": "t5",
          "shape": 7,
          "type": "WANTEXTENCODER",
          "link": 15
        },
        {
          "label": "model_to_offload",
          "name": "model_to_offload",
          "shape": 7,
          "type": "WANVIDEOMODEL",
          "link": 79
        }
      ],
      "outputs": [
        {
          "label": "text_embeds",
          "name": "text_embeds",
          "type": "WANVIDEOTEXTEMBEDS",
          "slot_index": 0,
          "links": [
            86
          ]
        }
      ],
      "properties": {
        "Node name for S&R": "WanVideoTextEncode",
        "cnr_id": "ComfyUI-WanVideoWrapper",
        "ver": "d9b1f4d1a5aea91d101ae97a54714a5861af3f50",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "A man is talking.",
        "色调艳丽，过曝，静态，细节模糊不清，字幕，风格，作品，画作，画面，静止，整体发灰，最差质量，低质量，JPEG压缩残留，丑陋的，残缺的，多余的手指，画得不好的手部，画得不好的脸部，畸形的，毁容的，形态畸形的肢体，手指融合，静止不动的画面，杂乱的背景，三条腿，背景人很多，倒着走",
        true,
        [
          false,
          true
        ],
        "gpu"
      ],
      "color": "#332922",
      "bgcolor": "#593930"
    },
    {
      "id": 30,
      "type": "VHS_VideoCombine",
      "pos": [
        1280,
        -360
      ],
      "size": [
        590,
        918
      ],
      "flags": {},
      "order": 36,
      "mode": 0,
      "inputs": [
        {
          "label": "图像",
          "name": "images",
          "type": "IMAGE",
          "link": 36
        },
        {
          "label": "音频",
          "name": "audio",
          "shape": 7,
          "type": "AUDIO",
          "link": 122
        },
        {
          "label": "批次管理",
          "name": "meta_batch",
          "shape": 7,
          "type": "VHS_BatchManager",
          "link": null
        },
        {
          "name": "vae",
          "shape": 7,
          "type": "VAE",
          "link": null
        }
      ],
      "outputs": [
        {
          "label": "文件名",
          "name": "Filenames",
          "type": "VHS_FILENAMES",
          "links": null
        }
      ],
      "properties": {
        "Node name for S&R": "VHS_VideoCombine",
        "cnr_id": "comfyui-videohelpersuite",
        "ver": "0a75c7958fe320efcb052f1d9f8451fd20c730a8",
        "widget_ue_connectable": {}
      },
      "widgets_values": {
        "frame_rate": 23,
        "loop_count": 0,
        "filename_prefix": "WanVideoWrapper_I2V_FantasyTalking",
        "format": "video/h264-mp4",
        "pix_fmt": "yuv420p",
        "crf": 19,
        "save_metadata": true,
        "trim_to_audio": false,
        "pingpong": false,
        "save_output": true,
        "videopreview": {
          "hidden": false,
          "paused": false,
          "params": {
            "filename": "WanVideoWrapper_I2V_FantasyTalking_00007-audio.mp4",
            "subfolder": "",
            "type": "output",
            "format": "video/h264-mp4",
            "frame_rate": 23,
            "workflow": "WanVideoWrapper_I2V_FantasyTalking_00007.png",
            "fullpath": "/root/workspace/bittensor-preview/ComfyUI/output/WanVideoWrapper_I2V_FantasyTalking_00007-audio.mp4"
          }
        }
      },
      "color": "#2a363b",
      "bgcolor": "#3f5159"
    },
    {
      "id": 87,
      "type": "Note",
      "pos": [
        180,
        -1500
      ],
      "size": [
        1260,
        1010
      ],
      "flags": {},
      "order": 22,
      "mode": 0,
      "inputs": [],
      "outputs": [],
      "properties": {},
      "widgets_values": [
        "Custom Node： \nhttps://github.com/kijai/ComfyUI-WanVideoWrapper/tree/main\nhttps://github.com/kijai/ComfyUI-KJNodes\nhttps://github.com/Kosinkadink/ComfyUI-VideoHelperSuite\n\nmodels：\ncomfyui\\models\\unet\nhttps://huggingface.co/Kijai/WanVideo_comfy/tree/main\n\ncomfyui\\models\\VAE\nhttps://huggingface.co/Kijai/WanVideo_comfy/tree/main\n\ncomfyui\\models\\clip\nhttps://huggingface.co/Comfy-Org/Wan_2.1_ComfyUI_repackaged/tree/main/split_files/clip_vision\n\n\ncloud：\nWorkflows：https://pan.quark.cn/s/e76d9e972e8c\nmodels：https://pan.quark.cn/s/5a0ab8dfce6e\nCustom Node：https://pan.quark.cn/s/16dca69ca023\ngithub_Workflows：https://github.com/yjuddpl/Interesting-things\n\nVideos：\nbilibili：https://space.bilibili.com/473724003\nYouTube：https://www.youtube.com/@%E6%9E%AB%E9%93%83%E9%A3%8E%E6%9E%97\n\nhttps://github.com/Fantasy-AMAP/fantasy-talking"
      ],
      "color": "#c09430",
      "bgcolor": "rgba(24,24,27,.9)"
    },
    {
      "id": 72,
      "type": "LoadAudio",
      "pos": [
        -1170,
        -390
      ],
      "size": [
        410,
        220
      ],
      "flags": {},
      "order": 23,
      "mode": 0,
      "inputs": [],
      "outputs": [
        {
          "label": "音频",
          "name": "AUDIO",
          "type": "AUDIO",
          "links": [
            120
          ]
        }
      ],
      "properties": {
        "Node name for S&R": "LoadAudio",
        "cnr_id": "comfy-core",
        "ver": "0.3.29",
        "widget_ue_connectable": {}
      },
      "widgets_values": [
        "voice.mp3",
        null,
        null
      ],
      "color": "#323",
      "bgcolor": "#535"
    },
    {
      "id": 80,
      "type": "PreviewImage",
      "pos": [
        -350.7531433105469,
        17.997005462646484
      ],
      "size": [
        340,
        350
      ],
      "flags": {},
      "order": 30,
      "mode": 0,
      "inputs": [
        {
          "label": "图像",
          "name": "images",
          "type": "IMAGE",
          "link": 116
        }
      ],
      "outputs": [],
      "properties": {
        "Node name for S&R": "PreviewImage",
        "cnr_id": "comfy-core",
        "ver": "0.3.29",
        "widget_ue_connectable": {}
      },
      "widgets_values": []
    }
  ],
  "links": [
    [
      15,
      11,
      0,
      16,
      0,
      "WANTEXTENCODER"
    ],
    [
      36,
      28,
      0,
      30,
      0,
      "IMAGE"
    ],
    [
      70,
      59,
      0,
      65,
      0,
      "CLIP_VISION"
    ],
    [
      79,
      22,
      0,
      16,
      1,
      "WANVIDEOMODEL"
    ],
    [
      82,
      65,
      0,
      63,
      1,
      "WANVIDIMAGE_CLIPEMBEDS"
    ],
    [
      84,
      68,
      0,
      22,
      5,
      "FANTASYTALKINGMODEL"
    ],
    [
      85,
      22,
      0,
      69,
      0,
      "WANVIDEOMODEL"
    ],
    [
      86,
      16,
      0,
      69,
      2,
      "WANVIDEOTEXTEMBEDS"
    ],
    [
      87,
      63,
      0,
      69,
      1,
      "WANVIDIMAGE_EMBEDS"
    ],
    [
      89,
      52,
      0,
      69,
      18,
      "TEACACHEARGS"
    ],
    [
      90,
      69,
      0,
      28,
      1,
      "LATENT"
    ],
    [
      96,
      39,
      0,
      22,
      1,
      "BLOCKSWAPARGS"
    ],
    [
      99,
      71,
      0,
      73,
      0,
      "WAV2VECMODEL"
    ],
    [
      100,
      68,
      0,
      73,
      1,
      "FANTASYTALKINGMODEL"
    ],
    [
      101,
      73,
      0,
      69,
      13,
      "FANTASYTALKING_EMBEDS"
    ],
    [
      104,
      58,
      0,
      74,
      0,
      "IMAGE"
    ],
    [
      107,
      74,
      0,
      65,
      1,
      "IMAGE"
    ],
    [
      108,
      74,
      0,
      63,
      2,
      "IMAGE"
    ],
    [
      109,
      74,
      1,
      63,
      8,
      "INT"
    ],
    [
      110,
      74,
      2,
      63,
      9,
      "INT"
    ],
    [
      111,
      75,
      0,
      63,
      10,
      "INT"
    ],
    [
      112,
      75,
      0,
      73,
      3,
      "INT"
    ],
    [
      113,
      78,
      0,
      73,
      4,
      "FLOAT"
    ],
    [
      114,
      79,
      0,
      78,
      0,
      "INT"
    ],
    [
      115,
      79,
      0,
      69,
      17,
      "INT"
    ],
    [
      116,
      74,
      0,
      80,
      0,
      "IMAGE"
    ],
    [
      117,
      38,
      0,
      81,
      0,
      "*"
    ],
    [
      118,
      82,
      0,
      28,
      0,
      "WANVAE"
    ],
    [
      119,
      83,
      0,
      63,
      0,
      "WANVAE"
    ],
    [
      120,
      72,
      0,
      84,
      0,
      "*"
    ],
    [
      121,
      84,
      0,
      73,
      2,
      "AUDIO"
    ],
    [
      122,
      85,
      0,
      30,
      1,
      "AUDIO"
    ]
  ],
  "groups": [
    {
      "id": 2,
      "title": "Models",
      "bounding": [
        -1180,
        -1540,
        1330,
        1060
      ],
      "color": "#88A",
      "font_size": 24,
      "flags": {}
    },
    {
      "id": 3,
      "title": "Sampler",
      "bounding": [
        -1180,
        -460,
        3060,
        1031.5999755859375
      ],
      "color": "#3f789e",
      "font_size": 24,
      "flags": {}
    }
  ],
  "config": {},
  "extra": {
    "ds": {
      "scale": 0.33674990280644185,
      "offset": [
        940.0577119374459,
        965.5530159194086
      ]
    },
    "frontendVersion": "1.27.7",
    "node_versions": {
      "ComfyUI-WanVideoWrapper": "5a2383621a05825d0d0437781afcb8552d9590fd",
      "comfy-core": "0.3.26",
      "ComfyUI-KJNodes": "a5bd3c86c8ed6b83c55c2d0e7a59515b15a0137f",
      "ComfyUI-VideoHelperSuite": "0a75c7958fe320efcb052f1d9f8451fd20c730a8"
    },
    "VHS_latentpreview": false,
    "VHS_latentpreviewrate": 0,
    "VHS_MetadataImage": true,
    "VHS_KeepIntermediate": true,
    "ue_links": [],
    "links_added_by_ue": []
  },
  "version": 0.4
}

export const defaultGraphJSON = JSON.stringify(defaultGraph)

export const blankGraph: ComfyWorkflowJSON = {
  last_node_id: 0,
  last_link_id: 0,
  nodes: [],
  links: [],
  groups: [],
  config: {},
  extra: {},
  version: 0.4
}
