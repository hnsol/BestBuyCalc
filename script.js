document.addEventListener('DOMContentLoaded', function() {
    // アプリ起動時にメッセージを表示
    document.getElementById('result').textContent = 'AとBの量と値段を入力してください。';

    // 入力フィールドにイベントリスナーを追加
    document.getElementById('quantityA').addEventListener('input', autoCalculate);
    document.getElementById('priceA').addEventListener('input', autoCalculate);
    document.getElementById('quantityB').addEventListener('input', autoCalculate);
    document.getElementById('priceB').addEventListener('input', autoCalculate);
});

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
        document.getElementById('result').textContent = 'いい感じです。さらに入力ください……';
        return; // 早期リターン
    }

    // 未入力フィールドに応じたメッセージの表示
    var resultText = '';
    if (!quantityA) {
        let unitPriceB = priceB / quantityB;
//        resultText = `Aの量が${unitPriceB * priceA}より多かったら、Aを買おう！`;
        resultText = `Aの量が${Math.floor(unitPriceB * priceA * 100) / 100}より多かったら、Aを買おう！`;
    } else if (!priceA) {
        let unitPriceB = priceB / quantityB;
//        resultText = `Aの値段が${unitPriceB * quantityA}円より安かったら、Aを買おう！`;
        resultText = `Aの値段が${Math.floor(unitPriceB * quantityA * 100) / 100}円より安かったら、Aを買おう！`;
    } else if (!quantityB) {
        let unitPriceA = priceA / quantityA;
//        resultText = `Bの量が${unitPriceA * priceB}より多かったら、Bを買おう！`;
        resultText = `Bの量が${Math.floor(unitPriceA * priceB * 100) / 100}より多かったら、Bを買おう！`;
    } else if (!priceB) {
        let unitPriceA = priceA / quantityA;
//        resultText = `Bの値段が${unitPriceA * quantityB}円より安かったら、Bを買おう！`;
        resultText = `Bの値段が${Math.floor(unitPriceA * quantityB * 100) / 100}円より安かったら、Bを買おう！`;
    } else {
        // すべてのフィールドが入力されている場合の計算
        var unitPriceA = priceA / quantityA;
        var unitPriceB = priceB / quantityB;
        if (unitPriceA < unitPriceB) {
            resultText = "Aの方がお買い得";
        } else if (unitPriceA > unitPriceB) {
            resultText = "商品Bの方がお買い得";
        } else {
            resultText = "AとBの単価はおなじ";
        }
    }
    document.getElementById('result').textContent = resultText;
}
