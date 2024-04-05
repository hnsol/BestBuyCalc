document.addEventListener('DOMContentLoaded', function() {
    // アプリ起動時にメッセージを表示
    document.getElementById('result').textContent = '量と価格の情報が必要です。入力してください';

    var inputs = document.querySelectorAll('#quantityA, #priceA, #quantityB, #priceB');
    inputs.forEach(function(input) {
        input.addEventListener('input', debounce(autoCalculate, 500));
    });
    
    // id="quantityA"の入力フィールドにフォーカスを当てる
    document.getElementById('quantityA').focus();
});

// タイプライターっぽいエフェクトに記号を追加する
function typeEffect(element, text, delay = 50) {
    let i = 0;
    element.textContent = ''; // 現在のテキストをクリア
    const textNode = document.createTextNode('');
    element.appendChild(textNode);
    
    const cursorSpan = document.createElement('span'); // 「●」用のspanを作成
    cursorSpan.classList.add('cursor');
    cursorSpan.textContent = '●'; // spanに「●」を設定
    element.appendChild(cursorSpan); // spanをelementに追加

    let timer = setInterval(function() {
        if (i < text.length) {
            textNode.data += text.charAt(i);
            i++;
        }
        
        if (i === text.length) {
            clearInterval(timer);
            setTimeout(() => { // 少し遅延させてから「●」を透明にする
                cursorSpan.style.opacity = '0';
            }, 800); // 1秒後に透明化
        }
    }, delay);
}

// 遅延実行を管理するための関数
function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 入力状態を追跡するための変数
let lastInputsFilledCount = 0;

function autoCalculate() {
    var quantityA = document.getElementById('quantityA').value;
    var priceA = document.getElementById('priceA').value;
    var quantityB = document.getElementById('quantityB').value;
    var priceB = document.getElementById('priceB').value;

    // 入力されたフィールドの数をカウント
    var inputsFilled = [quantityA, priceA, quantityB, priceB].filter(function(value) {
        return value !== '';
    }).length;

   // 前回の入力フィールド数と比較して、メッセージを更新
    if ((inputsFilled === 1 && lastInputsFilledCount === 0) || (inputsFilled === 2 && lastInputsFilledCount === 3)) {
        lastInputsFilledCount = 1;
        typeEffect(document.getElementById('result'), 'もう少し情報があればアドバイスができそうです。続けて入力してください', 50);
        return;
    }
        
    // // 3つ未満の入力では何もしない
    if (inputsFilled < 3) return;

    // 未入力フィールドに応じたメッセージの表示
    var resultText = '';
    if (inputsFilled === 3) {
        let unitPriceA = priceA / quantityA;
        let unitPriceB = priceB / quantityB;
        if (!quantityA) {
            resultText = `もしAの量が${Math.floor(priceA / unitPriceB * 100) / 100}を超えるなら、Aを選ぶのが良さそうです！`;
        } else if (!priceA) {
            resultText = `Aが${Math.floor(unitPriceB * quantityA * 100) / 100}円以下であれば、Aの方がお得です！`;
        } else if (!quantityB) {
            resultText = `もしBの量が${Math.floor(priceB / unitPriceA * 100) / 100}を超えるなら、Bを選ぶのが良さそうです！`;
        } else if (!priceB) {
            resultText = `Bが${Math.floor(unitPriceA * quantityB * 100) / 100}円以下であれば、Bの方がお得です！`;
        }
    }
       
    if (inputsFilled === 4) {
        // すべてのフィールドが入力されている場合の計算
        var unitPriceA = priceA / quantityA;
        var unitPriceB = priceB / quantityB;
        if (unitPriceA < unitPriceB) {
            resultText = "Aの方がお得です。こちらを選んではいかがでしょうか";
        } else if (unitPriceA > unitPriceB) {
            resultText = "Bの方がお得です。こちらを選んではいかがでしょうか";
        } else {
            resultText = "どちらも同じ単価のようです。お好きな方を選んでください。迷ったときは、心の声を聴いてみましょう！";
        }
    }

    typeEffect(document.getElementById('result'), resultText, 50); // 一文字ずつ表示
    lastInputsFilledCount = inputsFilled; // 現在の入力フィールドの状態を更新

}
