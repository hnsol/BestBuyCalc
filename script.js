document.addEventListener('DOMContentLoaded', function() {
    // アプリ起動時にメッセージを表示
    document.getElementById('result').textContent = '量と価格の情報が必要です。入力してください';

    // 入力フィールドにイベントリスナーを追加
//    document.getElementById('quantityA').addEventListener('input', autoCalculate);
//    document.getElementById('priceA').addEventListener('input', autoCalculate);
//    document.getElementById('quantityB').addEventListener('input', autoCalculate);
//    document.getElementById('priceB').addEventListener('input', autoCalculate);
    var inputs = document.querySelectorAll('#quantityA, #priceA, #quantityB, #priceB');
    inputs.forEach(function(input) {
        input.addEventListener('input', debounce(autoCalculate, 500));
    });
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

function autoCalculate() {
    var quantityA = document.getElementById('quantityA').value;
    var priceA = document.getElementById('priceA').value;
    var quantityB = document.getElementById('quantityB').value;
    var priceB = document.getElementById('priceB').value;

    // 入力されたフィールドの数をカウント
    var inputsFilled = [quantityA, priceA, quantityB, priceB].filter(function(value) {
        return value !== '';
    }).length;

    // 入力が3つ以上あるかどうかチェック
    if (inputsFilled < 3) {
        document.getElementById('result').textContent = 'もう少し情報があれば、最適なアドバイスができそうです。続けて入力してみてください';
        return; // 早期リターン
    }

    // 未入力フィールドに応じたメッセージの表示
    var resultText = '';
    if (!quantityA) {
        let unitPriceB = priceB / quantityB;
        resultText = `もしAの量が${Math.floor(priceA / unitPriceB * 100) / 100}を超えるなら、Aを選ぶのが良さそうです！`;
    } else if (!priceA) {
        let unitPriceB = priceB / quantityB;
        resultText = `Aが${Math.floor(unitPriceB * quantityA * 100) / 100}円以下であれば、Aの方がお得です！`;
    } else if (!quantityB) {
        let unitPriceA = priceA / quantityA;
        resultText = `もしBの量が${Math.floor(priceB / unitPriceA * 100) / 100}を超えるなら、Bを選ぶのが良さそうです！`;
    } else if (!priceB) {
        let unitPriceA = priceA / quantityA;
        resultText = `Bが${Math.floor(unitPriceA * quantityB * 100) / 100}円以下であれば、Bの方がお得です！`;
    } else {
        // すべてのフィールドが入力されている場合の計算
        var unitPriceA = priceA / quantityA;
        var unitPriceB = priceB / quantityB;
        if (unitPriceA < unitPriceB) {
            resultText = "Aの方がお得みたいです。いかがでしょう？";
        } else if (unitPriceA > unitPriceB) {
            resultText = "Bの方がお得みたいです。いかがでしょう？";
        } else {
            resultText = "どちらも同じ単価のようです。お好きな方を選んでください。迷ったときは、心の声を聴いてみましょう！";
        }
    }
//    document.getElementById('result').textContent = resultText;
    typeEffect(document.getElementById('result'), resultText, 50); // 一文字ずつ表示

}
