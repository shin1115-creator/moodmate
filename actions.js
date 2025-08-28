// actions.js
// Default action master list used by Log view and editable in Actions view
window.DEFAULT_ACTIONS = [
  { id:'breath-2min', title:'2分の深呼吸', description:'4秒吸う→4秒止める→8秒吐く を6回', category:'breath', recommendation:3, moodBias:'low' },
  { id:'walk-5min', title:'5分だけ外を歩く', description:'日光とリズム運動で活性化', category:'walk', recommendation:3, moodBias:'low' },
  { id:'water', title:'コップ1杯の水', description:'水分補給で頭をクリアに', category:'hydrate', recommendation:2, moodBias:'low' },
  { id:'music', title:'好きな曲を1曲', description:'3〜5分。聴いたら次の一歩へ', category:'reward', recommendation:2, moodBias:'mid' },
  { id:'todo-1step', title:'タスクを極小化', description:'最小の着手で勢いをつける', category:'productivity', recommendation:2, moodBias:'mid' },
  { id:'stretch-neck', title:'首と肩のストレッチ', description:'30秒だけ。ゆっくり回す', category:'stretch', recommendation:2, moodBias:'low' },
  { id:'tea', title:'温かい飲み物', description:'カフェイン控えめで一息', category:'rest', recommendation:1, moodBias:'low' }
];
