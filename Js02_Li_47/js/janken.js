
y_choice = null
let y_score = 0;//プレイヤーの勝利数
let c_score = 0;//COMの勝利数
let n_score = 0;//引き分け数
let count = 0; //対戦した回数
let selected ="";//予定対戦回数

//対戦回数を決める
let str ="";
for(let i=3; i<11; i++){
  str += `<option>${i}<option>`;
} 
$("#select").html(str)

const select = document.querySelector('#select');
selected=select.value;
select.onchange = function(){
  selected=this.value;
}


// プレイヤー選択後の処理

$("#gu_btn").on("click", function() {    
  $("#y_choice_text").text("↓your choice");
  $("#y_choice_img").html('<img src="img/janken_gu.png">');
  y_choice = 0  
})

$("#cho_btn").on("click", function() {    
  $("#y_choice_text").text("↓your choice");
  $("#y_choice_img").html('<img src="img/janken_cho.png">');
  y_choice = 1
})

$("#pa_btn").on("click", function() {    
  $("#y_choice_text").text("↓your choice");
  $("#y_choice_img").html('<img src="img/janken_pa.png">');
  y_choice = 2
})  

// STARTボタン押した後の処理

function start() {
  if(y_choice == null){
    $("#title").text("先に選んでください");
  }else{
    $("#c_choice_text").text("↓com's choice");
    c_choice();
  }
  
  function c_choice(){
    count++
    $("#title").text(count+"回戦");
     // COMの選択
    const c_choice = Math.floor(Math.random() * 3);
    if(c_choice == 0){
      choice_img = '<img src="img/janken_gu.png" >'; 
    }else if(c_choice == 1){
      choice_img = '<img src="img/janken_cho.png" >';
    }else if(c_choice == 2){
      choice_img = '<img src="img/janken_pa.png" >';
    }

     // 勝敗判定
    if (y_choice == c_choice) {
      draw();
    }else if(y_choice == 0 && c_choice == 1) {
      win();
    }else if(y_choice == 1 && c_choice == 2) {
      win();
    }else if(y_choice == 2 && c_choice == 0) {
      win();
    }else {
      lose();
    }}

// 勝敗判定後の処理
      function draw(){
        judgement = "draw";
        judgement_img = '<img src="img/pose_draw.png" >';
        document.getElementById('audio0').currentTime = 0; //連続クリックに対応
        document.getElementById('audio0').play();
        n_score++
      }

      function win(){
        judgement = "you win";
        judgement_img = '<img src="img/pose_win.png" >';
        document.getElementById('audio1').currentTime = 0; //連続クリックに対応
        document.getElementById('audio1').play();
        y_score++;
      }

      function lose(){
        judgement = "you lose";
        judgement_img = '<img src="img/pose_lose.png" >';
        document.getElementById('audio2').currentTime = 0; //連続クリックに対応
        document.getElementById('audio2').play();
        c_score++;
      }

 // 結果表示

  $("#c_choice_img").html(choice_img);
  $("#judgement").text(judgement);
  $("#judgement_img").html(judgement_img);
  $("#y_score").text(y_score);
  $("#c_score").text(c_score);
  if(count >= selected){
    end();
  }

 // 終了処理
  function end(){
    start_btn.value = "GAME OVER";
    start_btn.style.background = "#f00";
    $("#title").text("結果："+count+"戦"+y_score+"勝"+(c_score)+"敗"+n_score+"あいこ");
  }
}