import React, {useState, useEffect, useCallback} from 'react'
import defaultDataset from './dataset'
import './assets/styles/style.css'
import { AnswersList, Chats, Loading } from './components/index'
import FormDialog from './components/Forms/FormDialog'

const App = () => {
  const [answers, setAnswers] = useState([])
  const [chats, setChats] = useState([])
  const [currentId, setCurrentId] = useState('init')
  const [dataset] = useState(defaultDataset)
  // firebaseでデプロイした場合は必要
  // const [dataset, setDataset] = useState({})
  const [open, setOpen] = useState(false)

  // 新しいチャットを追加するCallback関数
  const addChats = (chat) => {
    setChats(prevChats => {
      return [...prevChats, chat]
    })
  }

  // 問い合わせフォーム用モーダルを開くCallback関数
  const handleClickOpen = () => {
    setOpen(true)
  };

  // 問い合わせフォーム用モーダルを閉じるCallback関数
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);

  // 津フィの質問をチャットエリアに表示する関数
  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    // 選択された回答と次の質問をチャットに追加
    addChats({
      text: nextDataset.question,
      type: 'question'
    })
      // 次の回答一覧をセット
      setAnswers(nextDataset.answers)

      // 現在の質問IDをセット
      setCurrentId(nextQuestionId)
    }

  // 回答が選択されたときに呼ばれる関数
  const selectAnswer = useCallback((selectedAnswer, nextQuestionId) => {
    switch (true) {
      // お問い合わせが選択された場合
      case (nextQuestionId === 'contact'):
        handleClickOpen()
        break;

      // リンクが選択された場合
      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a')
        a.href = nextQuestionId
        a.target = '_blank'
        a.click()
        break;

      // 選択された回答をchatsに追加
      default:
        // 現在のチャット一覧を取得
        addChats({
          text: selectedAnswer,
          type: 'answer'
        })

        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 750)
        break;
    }
  },[answers])

  // 最初の質問をチャットエリアに表示する
  useEffect(() => {
      // firebaseを使用する場合、追記が必要

    displayNextQuestion(currentId, dataset[currentId])
  },[])

  // 最新のチャットが見えるように、スクロールの1を頂点をスクロール領域の最下部に設定する
  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area')
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  })

  return (
    <section className="c-section">
      <div className='c-box'>
        {(Object.keys(dataset).length === 0) ? (
          <Loading />
        ) : (
          <>
            <Chats chats={chats} />
            <AnswersList answers={answers} select={selectAnswer} />
          </>
        )}
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  );
}

export default App
