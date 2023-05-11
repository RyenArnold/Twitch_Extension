function executeScriptOnTab(tab, script) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: script,
  }, function(result) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    }
  });
}

// Получаем текущую активную вкладку
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  // Проверяем, что есть активная вкладка
  if (tabs.length > 0) {
    var tab = tabs[0];
    // Проверяем, что мы можем выполнить скрипт на этой вкладке
    if (chrome.scripting && chrome.scripting.executeScript) {
      // Обработчик нажатия кнопки изменения цвета
      document.getElementById("change").addEventListener("click", function() {
        // Получаем значение цвета из поля ввода
        var color = document.getElementById("color").value;
        // Выполняем скрипт на странице вкладки
        executeScriptOnTab(tab, function() {
          // Код для изменения цвета фона
          document.body.style.backgroundColor = color;
        });
      });
      // Возвращаем объект обещание
      return Promise.resolve();
    } else {
      console.error("Cannot execute script - invalid Chrome version");
      // возвращаем объект обещание с ошибкой
      return Promise.reject(new Error("Invalid Chrome version"));
    }
  } else {
    console.error("Cannot get active tab information");

    // Возвращаем объект обещание с ошибкой
    return Promise.reject(new Error("Cannot get active tab information"));
  }
});
