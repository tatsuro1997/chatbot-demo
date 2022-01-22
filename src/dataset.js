const defaultDataset = {
  "init": {
    answers: [
      { content: "仕事を依頼したい", nextId: "job_offer" },
      { content: "エンジニアのキャリアについて相談したい", nextId: "consultant" },
      { content: "コミュニティについて知りたい", nextId: "community" },
      { content: "お付き合いしたい", nextId: "dating" },
    ],
    question: "こんにちは！🐮たつろうへのご用件はなんでしょうか？",
  },
  "job_offer": {
    answers: [
      { content: 'コーチングをしてほしい', nextId: "coaching" },
      { content: 'エンジニア転職の相談をしたい', nextId: "https://menta.work/plan/4827" },
      { content: "その他", nextId: "other_jobs" }
    ],
    question: "どのようなお仕事でしょうか？",
  },
  "coaching": {
    answers: [
      { content: 'LINEでお友達になる', nextId: "https://line.me/R/ti/p/%40652ivsas" },
      { content: "その他", nextId: "other_jobs" }
    ],
    question: "LINEから体験セッションを受けることができます。お気軽に連絡してください。",
  },
  "other_jobs": {
    answers: [
      { content: "問い合わせる", nextId: "contact" },
      { content: "最初の質問に戻る", nextId: "init" }
    ],
    question: "その他についてですね。コチラからお問い合わせできます。",
  },
  "consultant": {
    answers: [
      { content: "自己研鑽コミュニティについて知りたい", nextId: "community" },
      { content: "最初の質問に戻る", nextId: "init" }
    ],
    question: "たつろうは普段から自己研鑽を継続しています。また、僕が運営する自己研鑽コミュニティ内でも相談に乗っていますよ。",
  },
  "community": {
    answers: [
      { content: "問い合わせる", nextId: "contact" },
      { content: "最初の質問に戻る", nextId: "init" }
    ],
    question: "2022年1月から自分を高めるコミュニティを始めました！🎉Webエンジニアへの転職を目指す人向けに、プログラミングを教えたりキャリアの相談に乗っています。",
  },
  "dating": {
    answers: [
      { content: "DMする", nextId: "https://twitter.com/tatsurolife" },
      { content: "最初の質問に戻る", nextId: "init" }
    ],
    question: "まずは一緒にランチでもいかがですか？DMしてください😘",
  },
}

export default defaultDataset
