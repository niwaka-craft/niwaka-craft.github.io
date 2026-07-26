export type WorkCategory = "environment" | "prop" | "character";

/*
 * サイト文章・作品データの編集専用ファイル。
 *
 * 通常の文章修正では、ダブルクォート "..." の内側だけを書き換える。
 * 作品の category は次の三種類から選ぶ。
 *   environment = 背景
 *   prop        = プロップ
 *   character   = キャラクター
 *
 * 制作依頼の受付状態は commission.status.accepting で切り替える。
 *   true  = 受付中
 *   false = 受付停止中
 *
 * カンマ、コロン、括弧はサイトを動かすために必要なので削除しない。
 */
export const siteContent = {
  metadata: {
    title: "NiwakaCraft | 3D Modeler",
    description:
      "VRChat・Unity向けの3D背景、プロップ、キャラクターを制作するNiwakaCraft／丹羽にわかのポートフォリオ。",
  },

  brand: {
    name: "NiwakaCraft",
    creatorName: "丹羽にわか",
    logo: "/images/niwakacraft-logo.jpg",
    logoAlt: "NiwakaCraft 3D Environment Design ロゴ",
    homeLabel: "NiwakaCraft トップへ",
  },

  navigation: {
    label: "メインナビゲーション",
    items: [
      { label: "Work", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact", emphasized: true },
    ],
  },

  links: {
    booth: "https://niwakacraft.booth.pm/items/8589478",
    sampleWorld: "https://vrch.at/mj385b0h",
    x: "https://x.com/NiwaNiwaka1126",
  },

  hero: {
    image: "/images/wa-modern-a.webp",
    imageAlt: "和モダンホテル客室の3D環境",
    eyebrow: "3D Environment / Prop / Character Artist",
    titleLines: ["形をつくり、", "世界を組み立てる。"],
    copyLines: [
      "背景・プロップ・キャラクターの3Dモデル制作。",
      "世界観と用途の両方から、使えるアセットとして仕上げる。",
    ],
    workButton: "View work",
    boothButton: "View on BOOTH",
    featuredLabel: "Featured Work",
    featuredNumber: "01",
    scrollLabel: "Scroll",
  },

  work: {
    sectionLabel: "Selected Work",
    projectSingular: "Project",
    projectPlural: "Projects",
    categoriesLabel: "作品カテゴリー",
    categories: [
      {
        id: "environment" as WorkCategory,
        label: "背景",
        emptyMessage: "背景作品はまだ登録されていません。",
      },
      {
        id: "prop" as WorkCategory,
        label: "プロップ",
        emptyMessage: "プロップ作品は現在準備中です。",
      },
      {
        id: "character" as WorkCategory,
        label: "キャラクター",
        emptyMessage: "キャラクター作品は現在準備中です。",
      },
    ],
    openLabel: "View project",
    closeLabel: "Close",
    previousImageLabel: "前の画像",
    nextImageLabel: "次の画像",
    imageSelectorLabel: "表示する画像を選択",
    imageButtonSuffix: "枚目を表示",
  },

  projects: [
    {
      id: "wa-modern-hotel-room",
      category: "environment" as WorkCategory,
      categoryLabel: "3D Environment",
      year: "2026",
      title: "和モダンホテル客室",
      subtitle: "Wa-modern Hotel Room",
      thumbnail: "/images/wa-modern-cover.webp",
      thumbnailAlt: "和モダンホテル客室のサムネイル",
      description:
        "木目、格子、畳、行灯と間接照明を組み合わせ、落ち着いた高級ホテルの客室として構成したVRChat向け3D背景モデル。アバター撮影や個人用ルームとして使いやすい空間密度を意識しています。",
      meta: [
        { label: "Platform", value: "Unity / VRChat" },
        { label: "Scope", value: "Model / Material / Lighting / Setup" },
        { label: "Release", value: "2026" },
        { label: "Distribution", value: "BOOTH / ¥1,500" },
      ],
      galleryLabel: "和モダンホテル客室の画像",
      images: [
        {
          src: "/images/wa-modern-a.webp",
          alt: "ベッド、テレビ、入口を見渡せる和モダンホテル客室",
        },
        {
          src: "/images/wa-modern-b.webp",
          alt: "和モダンホテル客室のベッド周辺",
        },
        {
          src: "/images/wa-modern-c.webp",
          alt: "客室入口から見た空間構成",
        },
        {
          src: "/images/wa-modern-d.webp",
          alt: "ベッドから見た窓際のチェアスペース",
        },
        {
          src: "/images/wa-modern-e.webp",
          alt: "格子と間接照明を配置したテレビ側",
        },
      ],
      scopeLabel: "Production Scope",
      scope: [
        "Environment & Prop Modeling",
        "Materials & Textures",
        "Lighting & Scene Composition",
        "Unity Prefab & VRChat Setup",
      ],
      product: {
        label: "Published Asset",
        title: "UnityPackageを販売中。",
        description:
          "FBX、各種テクスチャ、設定済みマテリアル、配置済みPrefab、ライティング設定済みSceneを収録しています。",
        primaryButton: "BOOTHで見る",
        secondaryButton: "サンプルワールド",
      },
    },
  ],

  commission: {
    sectionLabel: "Commission",
    status: {
      accepting: false,
      openLabel: "受付中 / Available for work",
      closedLabel: "受付停止中 / Commissions closed",
      closedNoticeLabel: "Commissions Closed",
      closedNoticeTitle: "現在、新規の制作依頼受付を停止しています。",
      closedNoticeDescription:
        "料金目安と対応内容は、受付再開時の参考として引き続き掲載しています。再開時は当ページおよびXでお知らせします。",
      closedContactTitleLines: [
        "現在、制作依頼の受付を",
        "一時停止しています。",
      ],
      closedContactNoteLines: [
        "受付再開時期は未定です。",
        "再開のお知らせはXでご確認ください。",
      ],
      closedButton: "受付停止中",
    },
    title: "制作依頼について",
    description:
      "制作期間は応相談。仕様、用途、納期を確認したうえで個別に見積もりを行います。VRChat向けアセットに限らず、ゲーム・映像用の背景、プロップ、キャラクター制作にも対応いたします。",
    services: [
      {
        number: "01",
        title: "Environment",
        text: "室内・建築・撮影空間など、用途と画面設計を踏まえた3D背景制作。",
        price: "¥100,000〜",
      },
      {
        number: "02",
        title: "Props",
        text: "家具、小物、武器など、背景の世界観を支えるゲーム向けプロップ制作。",
        price: "¥20,000〜",
      },
      {
        number: "03",
        title: "Character",
        text: "ゲーム、映像、VRChatなど、用途とデザインに合わせた3Dキャラクター制作。",
        price: "¥150,000〜",
      },
    ],
    priceNote:
      "※料金は目安であり、形状、物量、品質、テクスチャ仕様、セットアップ範囲、商用利用条件によって変動します。",
    workflowLabel: "Workflow",
    workflowAriaLabel: "依頼の流れ",
    workflow: [
      { number: "01", label: "相談・仕様確認" },
      { number: "02", label: "見積もり" },
      { number: "03", label: "制作・確認" },
      { number: "04", label: "納品" },
    ],
  },

  about: {
    sectionLabel: "About",
    sectionName: "NiwakaCraft / 丹羽にわか",
    role: "3D Modeler",
    name: "丹羽にわか",
    brandName: "NiwakaCraft",
    description:
      "VRChat・Unity向けの背景、家具、小物、キャラクターなどを制作する3Dモデラー。単体のモデルだけではなく、光、配置、用途まで含めた「使える空間」として仕上げることを重視している。",
    softwareLabel: "Software",
    softwareAriaLabel: "使用ソフト",
    software: [
      "Blender",
      "Substance Painter",
      "ZBrush",
      "Marmoset Toolbag 4",
      "Clip Studio Paint",
      "Affinity Photo",
    ],
  },

  contact: {
    sectionLabel: "Contact",
    titleLines: [
      "3D背景・プロップ・キャラクター制作の",
      "ご相談を受け付けています。",
    ],
    noteLines: [
      "依頼内容、用途、希望納期、予算、納品形式を添えてご相談ください。",
      "メール作成時に依頼用テンプレートが自動入力されます。",
    ],
    email: "niwakacraft@gmail.com",
    emailButton: "Send email",
    xButton: "X / @NiwaNiwaka1126",
    emailSubject: "3D制作のご相談",
    emailTemplate:
      "お名前・法人名：\n制作物：\n用途：\n希望納期：\nご予算：\n納品形式：\nUnity組み込みの有無：\n参考資料：\n\n依頼内容：",
  },

  footer: {
    brand: "NiwakaCraft / 丹羽にわか",
    role: "3D Environment / Prop / Character Artist",
    copyright: "© 2026 NiwakaCraft",
  },
} as const;
