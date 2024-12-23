  "object" != typeof window.CP && (window.CP = {}),
  (window.CP.PenTimer = {
    programNoLongerBeingMonitored: !1,
    timeOfFirstCallToShouldStopLoop: 0,
    _loopExits: {},
    _loopTimers: {},
    START_MONITORING_AFTER: 0,
    STOP_ALL_MONITORING_TIMEOUT: 5e3,
    MAX_TIME_IN_LOOP_WO_EXIT: 2200,
    exitedLoop: function (E) {
      this._loopExits[E] = !0;
    },
    shouldStopLoop: function (E) {
      if (this.programKilledSoStopMonitoring) return !0;
      if (this.programNoLongerBeingMonitored) return !1;
      if (this._loopExits[E]) return !1;
      var _ = this._getTime();
      if (0 === this.timeOfFirstCallToShouldStopLoop)
        return (this.timeOfFirstCallToShouldStopLoop = _), !1;
      var o = _ - this.timeOfFirstCallToShouldStopLoop;
      if (o < this.START_MONITORING_AFTER) return !1;
      if (o > this.STOP_ALL_MONITORING_TIMEOUT)
        return (this.programNoLongerBeingMonitored = !0), !1;
      try {
        this._checkOnInfiniteLoop(E, _);
      } catch {
        return (
          this._sendErrorMessageToEditor(),
          (this.programKilledSoStopMonitoring = !0),
          !0
        );
      }
      return !1;
    },

    _checkOnInfiniteLoop: function (E, _) {
      if (!this._loopTimers[E]) return (this._loopTimers[E] = _), !1;
      if (_ - this._loopTimers[E] > this.MAX_TIME_IN_LOOP_WO_EXIT)
        throw "Infinite Loop found on loop: " + E;
    },
    _getTime: function () {
      return Date.now();
    },
  }),
  (window.CP.shouldStopExecution = function (E) {
    var _ = window.CP.PenTimer.shouldStopLoop(E);
    return 
  }),
  (window.CP.exitedLoop = function (E) {
    window.CP.PenTimer.exitedLoop(E);
  });

// Tạo hiệu ứng tuyết rơi
function createSnowflakes() {
  const snowflakeCount = 20; // Giảm số lượng bông tuyết
  for (let i = 0; i < snowflakeCount; i++) {
      let snowflake = document.createElement('div');
      snowflake.innerHTML = '❄';
      snowflake.classList.add('snowflake');
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.animationDuration = Math.random() * 5 + 8 + 's'; // Tốc độ rơi chậm hơn
      snowflake.style.fontSize = Math.random() * 20 + 10 + 'px'; // Kích thước ngẫu nhiên
      snowflake.style.opacity = Math.random();
      document.body.appendChild(snowflake);

      // Xóa bông tuyết sau khi rơi hết
      snowflake.addEventListener('animationend', () => {
          snowflake.remove();
      });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Khởi chạy hiệu ứng tuyết rơi mỗi 2 giây
  setInterval(createSnowflakes, 2000);

  const message = "Chúc em yêu Giáng Sinh vui vẻ!"; // Thông điệp muốn hiển thị
  const endMessage = document.querySelector('#endMessage');
  const span = endMessage.querySelector('.endMessage');
  let index = 0;

  function typeText() {
      if (index < message.length) {
          span.textContent += message[index];
          index++;
          setTimeout(typeText, 100);
      }
  }

  // Kiểm tra khi phần tử #endMessage hiển thị (opacity > 0)
  const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
          if (
              mutation.attributeName === 'style' && 
              window.getComputedStyle(endMessage).opacity > '0'
          ) {
              typeText(); // Bắt đầu hiệu ứng gõ chữ
              observer.disconnect(); // Dừng theo dõi sau khi bắt đầu
          }
      }
  });

  observer.observe(endMessage, { attributes: true });
});



