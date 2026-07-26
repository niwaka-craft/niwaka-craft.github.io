# NiwakaCraft Portfolio

丹羽にわか／NiwakaCraftの3Dモデリング・ポートフォリオサイトである。

## 文章と作品情報の変更

サイト内の文章、料金、受付状態、作品情報は、原則として `content/siteContent.ts` だけで更新できる。

制作依頼の受付状態は、同ファイル内の次の値で切り替える。

```ts
accepting: false,
```

- `false`: 受付停止中
- `true`: 受付中

## 公開

`main` ブランチへ変更を反映すると、GitHub Actionsが静的サイトを生成し、GitHub Pagesへ自動公開する。
