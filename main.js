(function(){
  'use strict';

  var genre = document.getElementById('genre');
  var question = document.getElementById('question');
  var btn = document.getElementById('btn');
  var answers = document.querySelectorAll('#answers > li');
  var shuffledAnswers;
  var scoreLavel = document.querySelector('#result > p:nth-of-type(1)');
  var percentage = document.querySelector('#result > p:nth-of-type(2)');
  var select = document.getElementById('select');
  var play = document.getElementById('play');
  var quizNames = document.querySelectorAll('#quizNames > li');
  var quizTitle = document.getElementById('quiz_title');
  var quizSet;
  var currentNum = 0;
  var isAnswered;
  var score = 0;


  // クイズのデータ
  var quizSets = [
    [
    {q: '「爆笑」と「大笑い」の言葉の、意味の違いは何でしょう？', a: ['笑う人の数', '笑う声の大きさ', '笑う時間の長さ']},
    {q: 'お医者さんや看護師さんは、基本的に白い白衣を着ますが、手術の時には、青緑色の制服を着る人が多いです。一体なぜ？', a: ['目を疲れにくくするため', '色によって役割分担があるため', '菌が繁殖しないための、特殊な加工をしているから']},
    {q: 'すっかりおなじみとなっているスポーツ「フィギュアスケート」。元々はスポーツ競技だったわけではなく、別の用途で行われていました。何をする行為だった？', a: ['氷の上に図形を描く行為', '人の重さで氷を割る行為', '目的地まで楽しく移動する行為']},
    {q: '「不意打ちなことに驚く」様子を「寝耳に水」って言いますね。この「水」って何をさしている？', a: ['洪水', '	海水', '井戸の水']},
    {q: '「サラダ油」という言葉が名づけられた理由は？', a: ['生でも食べられるから', '開発者が野菜農家を経営してたから', 'サラダにかけることが多かったから']},
    {q: '「しゃぶしゃぶ」という料理は、大阪の「スエヒロ」というお店の社長が開発しました。「しゃぶしゃぶ」という言葉を名付ける時、社長は、自分の近くの人間のある様子から名付けたのですが、それは何でしょう？', a: ['	従業員が、おしぼりを洗う様子', '子どもが、お肉を加えている様子', '従業員が、お米を研いでいる様子']},
    {q: '音楽で一番盛り上がる部分を「サビ」と言いますね。その言葉の語源は何？', a: ['ワサビ', 'わびさび', 'さびついた石']},
    {q: '日本で「スリッパ」という物ができたのは明治時代。旅館などで、特定の人に履いてもらうため作られたのですが、どんな人？', a: ['外国人', '階級が高い人', '靴下をはいていない人']},
    {q: '全国の自治体で流している「音楽チャイム」。夕方ごろになると「赤とんぼ」「夕焼け小焼け」などが流れてくる地域も多いです。あの音楽には「時報」の役割の他に、昔からもう一つの意味がありました。一体何？', a: ['火災に備えた点検', '仕事の終業時間', '剣術稽古の時間']},
    {q: 'ローストチキンには銀紙が巻かれているものが多いですね。あれにはどんな理由があるでしょう？', a: ['骨の断面を隠すため', '保存状態を良くするため', '手を汚さずに食べるため']},
    {q: 'アメンボの「アメ」を漢字で書くと「雨」ではなく「飴」と書きます。その理由とは何でしょう？', a: ['飴のような匂いがするから', '飴を好んで食べるから', '「雨」という言葉が不吉とされていたから']},
    {q: '事件を審理する裁判の時、裁判官は「法服」と言われる黒い服を着ることがほとんどです。黒い服を着るのは、どんな意味があるのでしょう？', a: ['どんな色にも染まらない', '白黒はっきりさせる', '人の人生に関わることへの礼儀']}
  ],
  [
    {q: 'ベンゼンを最初に発見したのは誰でしょう??', a: ['ファラデー', 'ケクレ', 'デュワー']},
    {q: 'ひとつだけちがう化合物からできている宝石はどれでしょう？', a: ['真珠', 'サファイア', 'ルビー']},
    {q: '次のうち実際にある化合物名はどれでしょう？', a: ['オカダ酸', 'オシム酸', 'ザッケローニ酸']},
    {q: '超伝導体では、なにの値が限りなく大きい？', a: ['電流', '電圧', '抵抗']},
    {q: '石鹸で汚れが落ちるときの現象は？', a: ['乳化', 'コロイド化', 'キレイ化']},
    {q: '次のうち元素名でないものはどれでしょう？?', a: ['トリチウム', 'タリウム', 'トリウム']},
    {q: 'ワラビに含まれる発癌性物質はどれでしょう??', a: ['プタキロサイド', 'シガトキシン', 'アフラトキシン']},
    {q: '同じ形と大きさでメダルを作ったとき一番重いのはどれでしょう？', a: ['金メダル', '銀メダル', '銅メダル']},
    {q: 'リチウムを多く埋蔵していることで有名なウユニ塩湖はどの国にあるでしょう？?', a: ['ボリビア', 'リビア', 'ラトビア']},
    {q: '水面に浮かんで読書をするシーンで有名なアラビア半島の死海と日本海とでは何がちがうのでしょう？', a: ['塩分', '塩分濃度', '水流']}
  ],
  [
    {q: '牛乳1本には、何グラムのカルシウムが含まれているでしょうか？', a: ['200ｍｇ', '300ｍｇ', '150ｍｇ']},
    {q: '宮本武蔵が強かった理由は何でしょうか？', a: ['固いものを食べていたから', '白米を中心に食べていたから', '柔らかいものを食べていたから']},
    {q: 'テスト前におすすめ記憶力が良くなるといわれる食べ物は？', a: ['クルミ', '大豆', 'ピーナッツ']},
    {q: '小学校の低学年と高学年で理想的とされる睡眠時間は？', a: ['低学年10時間・高学年9時間', '低学年7時間・高学年6時間', '低学年8時間・高学年7時間']},
    {q: '風邪予防に効果がある果物はどれでしょうか？', a: ['みかん', 'ぶどう', 'りんご']},
    {q: '織田信長も愛していた食べ物で「強運食」と呼ばれる食べ物は？', a: ['ゴマ', 'きなこ', 'あんこ']},
    {q: '熱中症予防で冷やすと良い場所は？', a: ['首の横', 'おでこ', '背中']},
    {q: '世界三大美女の一人である楊貴妃が好きだった野菜はどれでしょうか？', a: ['きゅうり', 'かぼちゃ', 'とまと']},
    {q: 'スペインの国王フィリップ５世が悩まされていた不眠症が治った治療方法は何でしょうか？', a: ['音楽療法', '食事療法', '運動療法']},
    {q: '入浴の時、免疫力を高めるには何度のお湯につかるのが最適でしょうか？', a: ['40度', '45度', '50度']},
  ]
];



// シャッフル関数
function shuffle(arr) {
  var i;
  var j;
  for (i = arr.length - 1; i >= 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

// クイズをセットしてくれる関数
function setQuiz() {
  var i;
  isAnswered = false;
  question.textContent = '第' + (currentNum + 1) +'問：' + quizSet[currentNum].q;
  shuffledAnswers = shuffle(quizSet[currentNum].a.slice())
  for (i = 0; i < answers.length; i++) {
    answers[i].classList.remove('correct');
    answers[i].classList.remove('wrong');
    answers[i].textContent = shuffledAnswers[i];
  }
  btn.classList.add('disabled');
  if (currentNum === quizSet.length - 1) {
    btn.textContent = '結果を見る';
  }
}

// イベント関数
function setEvents() {
  var i;
  for (i = 0; i < answers.length; i++) {
    answers[i].addEventListener('click', function() {
      checkAnswer(this);
    })
  }

  btn.addEventListener('click', function() {
    if (this.classList.contains('disabled')) {
      return;
    }
    if(currentNum === quizSet.length) {
      scoreLavel.textContent ='スコア：' + score + '/' + quizSet.length;
      percentage.textContent = '正答率：' +  Math.round(score / quizSet.length * 100 * 10) / 10 + '%';
      result.classList.add('show');
    }
    setQuiz();
  })
}


// 正誤判定する関数
function checkAnswer(node) {
  if (isAnswered) {
    return;
  }
  isAnswered = true;
  if (node.textContent === quizSet[currentNum].a[0]) {
    node.classList.add('correct');
    node.textContent += '... 正解！'
    score++;
  } else {
    node.classList.add('wrong');
    node.textContent += '... 不正解！'
  }
  btn.classList.remove('disabled');
  currentNum++;
}


// ここで、それぞれの選択肢を選んだときの諸々の処理を実行している
//３つの塊を一つにまとめたい。このままでは、クイズの種類が増えるごとに同じものを下に追加していかなくてはならない。
quizNames[0].addEventListener('click', function() {
  quizSet = quizSets[0];
  select.classList.add('hidden');
  play.classList.remove('hidden');
  quizTitle.textContent = '雑学クイズ12問'
  setQuiz();
  setEvents();
})
quizNames[1].addEventListener('click', function() {
  quizSet = quizSets[1];
  select.classList.add('hidden');
  play.classList.remove('hidden');
  quizTitle.textContent = '化学クイズ10問'
  setQuiz();
  setEvents();
})
quizNames[2].addEventListener('click', function() {
  quizSet = quizSets[2];
  select.classList.add('hidden');
  play.classList.remove('hidden');
  quizTitle.textContent = '健康クイズ10問'
  setQuiz();
  setEvents();
})

})();
