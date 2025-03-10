let input;
let slider;
let button;
let dropdown;
let iframe;
let isBouncing = false;
let offsets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10);
  input.attribute('placeholder', '請輸入文字'); // 設置預設文字
  
  slider = createSlider(28, 50, 32); // 創建滑桿，範圍從 28 到 50，初始值為 32
  slider.position(input.x + input.width + 10, 10);
  
  button = createButton('跳動文字');
  button.position(slider.x + slider.width + 10, 10);
  button.mousePressed(() => {
    isBouncing = !isBouncing;
    if (isBouncing) {
      offsets = Array(Math.ceil((height - 50) / textSize())).fill(0).map(() => random(0, TWO_PI));
    }
  });
  
  dropdown = createSelect();
  dropdown.position(button.x + button.width + 10, 10);
  dropdown.option('淡江大學');
  dropdown.option('教科系網站');
  dropdown.option('測驗卷');
  dropdown.changed(() => {
    let selected = dropdown.value();
    if (iframe) iframe.remove(); // 移除之前的 iframe
    iframe = createElement('iframe');
    iframe.position(100, 100);
    iframe.size(width - 200, height - 200);
    if (selected === '淡江大學') {
      iframe.attribute('src', 'https://www.tku.edu.tw/');
    } else if (selected === '教科系網站') {
      iframe.attribute('src', 'https://www.et.tku.edu.tw/');
    } else if (selected === '測驗卷') {
      iframe.attribute('src', 'https://lykke1027.github.io/20250310/');
    }
  });
}

function draw() {
  background(0); // 背景為黑色
  let txt = input.value();
  if (txt === '') {
    txt = '😁👍'; // 如果沒有輸入文字，顯示 "123"
  }
  fill(255); // 文字為白色
  textAlign(LEFT, TOP);
  textSize(slider.value()); // 根據滑桿的值設置字體大小
  let repeatedText = txt.split(' ').join(' '.repeat(5)); // 在每個詞之間加入空格
  let lines = Math.ceil((height - 50) / textSize());
  for (let i = 0; i < lines; i++) {
    let y = i * textSize() + 50;
    if (isBouncing) {
      y += sin(offsets[i] + frameCount * 0.1) * 10; // 讓文字上下跳動
    }
    let x = 0;
    while (x < width) {
      text(repeatedText, x, y);
      x += textWidth(repeatedText);
    }
  }
}
