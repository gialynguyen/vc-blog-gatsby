---
title: React v17.0 Release Candidate
date: "2020-08-11T13:04:56.161Z"
description: "Facebook vừa xuất bản bản cập nhật đầu tiên (ver Candidate) cho React.js 17.0. Đã hơn 2 năm kể từ bản update lớn trước đó (v16.0). Trong bài viết này, tôi sẽ mô tả khái quát những thay đổi trong bản cập nhật lớn này của React.js"
---

## Không hề có bất cứ một Feature mới nào!!!

Theo đội ngũ phát triển React, thì trong bản update lơn này sẽ không hề có bất cứ feature mới nào dành cho các lập trình viên. Thay vào đó, bản update này tập trung chủ yếu vào việc hỗ trợ **upgrade** React một cách dễ dàng hơn.

Ngoài ra, đội ngũ phát triển còn khẳng định rằng họ vẫn đang tích cực phát triển các tính năng mới và nó sẽ được đề cập đến trong các bản update tiếp theo.

Đặc biệt, họ cũng nhận định rằng React ver 17 sẽ là 1 bản update "bước đệm" giúp việc "nhúng" (embeb) các version khác nhau của React vào với nhau sẽ dễ dàng và an toàn hơn.

## Nâng cấp "dần dần" (Gradual Upgrades)

Nếu ta để ý, khi cho ra đời các phiên bản update, thì đội ngũ phát triển React có chung một "style": **"all-or-nothing"** - Giúp có các lập trình viên có 2 options rõ ràng: Một là nâng cấp toàn bộ app lên version mới hoặc là vẫn sử dụng phiên bản cũ và không gặp phải sự bất tương thích nào cả.

Điều này dẫn đến một vấn đề: Nếu một feature hay một API nào đã được ra đời trước đó thì đội ngũ phát triển React vẫn phải duy trì nó vô thời hạn mặc cho chúng không còn ai sử dụng nữa - vấn đề này liên quan đến việc bảo trì các dự án cũ.

Vì vậy, ở phiên bản React v17, các nhà phát triển cho chúng ta 1 option khác, đó chính: **Nâng cấp "dần dần" (Gradual Upgrades)**

Tức là giờ đây, khi phải upgrade version cho React App thì chúng ta không nhất thiết phải **"di chuyển"** toàn bộ source code sang version mới, thay vào đó, chúng ta hoàn toàn có thể **"upgrade có chọn lọc"** trong cùng một dự án, source code React thuộc các version khác nhau hoàn toàn có thể **"nhúng" (embeb)** cùng với nhau mà không có vấn đề gì về mặt tương thích.

##### Demo of Gradual Upgrades: 
*[example repository](https://github.com/reactjs/react-gradual-upgrade-demo/)*

Tuy nhiên, các đội ngũ phát triển cũng lưu ý rằng, tính năng này của React vẫn đang trong quá trình phát triển và cần phải thay đổi rất nhiều, nhất là về hệ thống quản lý sự kiện (Event) - sẽ được đề cập trong mục tiếp theo, để có thể đảm bảo sự tương thích về nguyên lý hoạt động giữa các version React khác nhau.


## Thay đổi cơ chế: Event Delegation

Trong React, ta thường xuyên implement các inline event handler dạng như thế này:

```
<button onClick={handleClick}>

```

Điều này **"gần như"** tương đương với đoạn code sau khi ta implement trên vanilla DOM:

```
myButton.addEventListener('click', handleClick);

```

**Nhưng tại sao lại là "gần như" ?**

Bởi vì, trong React, đối với hầu hết các sự kiện, React không thực sự gắn handler vào các nút DOM mà chúng ta khai báo. Thay vào đó, React gắn kèm handler của loại sự kiện đó trực tiếp vào **document** node. Đó được gọi là: **Event Delegation** ([tham khảo](https://davidwalsh.name/event-delegate)). Điều này giúp nâng cao về hiệu suất khi phải thao tác trên một cây DOM có kích thước lớn về chiều sâu.

Khi một DOM event được kích hoạt trên **document**, React sẽ tìm ra thành phần nào cần được gọi và sau đó React Event sẽ "bubbles" (bong bóng) lên trên đúng component mà chúng ta cần. Nhưng bản chất thì sự kiện sẽ được nổi lên bên trên **document** node - nơi React đã implement các trình xử lý sự kiện (event handler).

Tuy nhiên, điều này dẫn đến một hậu quả nghiêm trọng. Đó là khi register các event handler lên trên "top" khi điều này đã phá vỡ đi event.stopPropagation() - Tức là khi nested tree (cây DOM lẽ ra sẽ đứng ra nhận sự kiện) muốn ngừng truyền sự kiện thì DOM tree bên ngoài vẫn sẽ nhận được sự kiện đó bởi vì thực chất sự kiên được regiter ở cấp trên cùng. Điều này vô tình cũng tạo ra hạn chế khi phát triển tính năng **Gradual Upgrades**

Vì thế kể từ phiên bản React 17 trở đi, React sẽ thay đổi cơ chế khi đính kèm các event handler: thay vì register event handler ở **document** node thì React từ nay sẽ register event handler đó vào Container Node mà React DOM Tree khi được render

![react-17-event-delegation](https://reactjs.org/static/bb4b10114882a50090b8ff61b3c4d0fd/31868/react_17_delegation.png)

## Thêm một vài update nhỏ nữa về Event System

Bên cạnh việc thay đổi cơ chế Event Delegation, event system của React còn có thêm một số update "nho nhỏ" sau đây:

- Sự kiên onScroll sẽ không còn được "bubbles" để tránh gây nhầm lẫn. ([issue](https://github.com/facebook/react/issues/15723))
- onFucus và onBlur sẽ được chuyển đổi về focusin và focusout - đi đâu cho xa rồi cũng "quay về" với native (haha)
- Các sự kiên Capture phase (e.g. onClickCapture) sẽ hoạt động chính xác hơn.

## Không còn Event Pooling nữa (yeah)

Cũng chính vì các Event System "sida" của React trong các phiên bản trước trước mà sinh ra một hiện tượng "khó hiểu" đó chính là event pooling, gây nhầm lẫn cho cả nhưng lập trình viên có kinh nghiệm (như tui haha), nhất là khi truy xuất event trong các async action, ví dụ như:

```
function handleChange(e) {
  setData(data => ({
    ...data,
    // This crashes in React 16 and earlier:
    text: e.target.value
  }));
}
```

hay:

```
function handleChange(e) {
  setTimeout(data => ({
    ...data,
    // This crashes in React 16 and earlier:
    text: e.target.value
  }), 2000);
}
```

Ở các phiên bản trước thì điều này sẽ gây ra "crash" app và phải cần khai báo thêm event.persist(), nhưng từ phiên bản 17 trở đi Event Pooling sẽ bị "khai tử".

Nguyên nhân chính là vì React sẽ "dùng lại" các Event Object giữ các Event khác nhau (Event Object cũ sẽ bị ghi đè lên bởi Event Object mới nên không thể truy xuất Event Object cũ được nữa), ban đầu đội ngũ phát triển implement tính năng này để tăng hiệu suất trên các trình duyệt cũ

## Effect Cleanup thực thi đúng đắn hơn

Hầu hết các effects không cần phải trì hoãn quá trình render lên màn hình, vì thế React chạy các effects một cách **bất đồng bộ** (nếu muốn thực hiện effect đồng bộ, hãy dùng thằng này: useLayoutEffect).

Tuy nhiên trong các phiên bản trước, các cleanup effect được chạy đồng bộ (cụ thể: componentWillUnmount sẽ được chạy đồng bộ), điều này làm chậm đáng kể đến việc chuyển đổi, render screen trong các ứng dụng lớn (ví dụ: chuyển đổi các tabs,...)

Trong version 17, cleanup effect trong React sẽ được nhất quán thực thi bất đồng bộ - sẽ được chạy chạy sau khi screen đã được update.

Ngoài ra, các cleanup effect sẽ được thực thi đúng "thứ tự" hơn, trước đó thì một vài trường hợp sẽ thực thi không đúng theo thứ tự.

### Một vài "nguy hiểm" tiềm tàng:

Với việc update về cơ chế của các cleanup effect, vô tình dẫn đến nhiều trường hợp sẽ sinh ra lỗi, ví dụ như:

```
useEffect(() => {
  someRef.current.someSetupMethod();
  return () => {
    someRef.current.someCleanupMethod();
  };
});
```

Vì cleaup sẽ được thực thi sau khi DOM đã update, và *someRef.current* có khả năng đã thay đổi, vì thế tại thời điểm cleaup được thực thi thì có thể nhận giá trị current là *null*. Giải pháp cho case này như sau:

```
useEffect(() => {
  const instance = someRef.current;
  instance.someSetupMethod();
  return () => {
    instance.someCleanupMethod();
  };
});
```

## Các update nhỏ khác

- Nhất quán lỗi khi component return giá trụ *undefined* (thay vào đó hãy return *null* nhé hihi!)
- Update Native Component Stacks: giúp phát hiện ra component sinh ra lỗi một cách dễ dàng hơn (lúc trước mỗi lần có lỗi, React nó log ra các stack component sản sinh ra lỗi chẳng cụ thể tý nào, giờ thì đỡ khổ hơn rồi).
- Removing Private Exports (lên docs tham khảo thêm nhan)

## Changelog

[React v17 Changelog](https://reactjs.org/blog/2020/08/10/react-v17-rc.html#changelog)

## Resources

- https://reactjs.org/blog/2020/08/10/react-v17-rc.html