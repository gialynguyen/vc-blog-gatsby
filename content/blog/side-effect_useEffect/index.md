---
title: Side effect và useEffect trong React hook
date: "2021-03-16T21:12:56.161Z"
description: "Nhắc tới React hook không thể không nhắc tới useEffect, "
tags: ["React", "useEffect"]
---

## Side effect là gì?

Side effect là một khái niệm trong fuctional programing được định nghĩa như sau:
	
“Một hàm hay biểu thức được cho là có hiệu ứng lề (side effect) nếu nó thay đổi một số trạng thái ngoài tầm vực của nó; hoặc có một sự tương tác quan sát được (observable) với hàm gọi nó hay phạm vi bên ngoài bên cạnh việc trả lại giá trị”

Nói một cách dễ hiểu nếu một hàm thay đổi hoặc truy cập đến một biến bên ngoài phạm vi truy cập của nó thì đều gọi là side effect. Bên dưới là một số ví dụ cụ thể để mọi người dễ hình dung

    Thay đổi giá trị hay thuộc tính của một hay nhiều biến global.
    Viết hoặc tạo một file.
    Tạo HTTP request.
    Gọi một function có side effects.
    Thay đổi DOM
    …

## Cách sử dụng useEffect

Nếu bạn quen với các phương thức lifecycle của React class, bạn có thể hình dung useEffect Hook như sự kết hợp của componentDidMount,  componentDidUpdate, và componentWillUnmount.

Có 2 loại side effect phổ biến trong React component: loại không cần cleanup, và loại cần. Cùng phân biệt 2 loại này kỹ hơn.

## Effect không cần Cleanup

Chúng ta cùng xem ví dụ dưới đây

```
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

```

useEffect báo với React rằng Component của chúng ta cần thực hiện một việc gì đó sau khi render. React sẽ ghi nhớ hàm bạn truyền vào, và sau đó gọi lại hàm này sau khi DOM đã update.
Đặt useEffect bên trong Component cho phép chúng ta truy xuất đến state (hoặc bất kỳ prop nào) bên trong effect.


Bạn có thể bảo React bỏ qua việc apply effect nếu một số giá trị không thay đổi giữa các lần render. Để làm như vậy, truyền vào một array (không bắt buộc) vào useEffect:

```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Chỉ re-render effect nếu giá trị count thay đổi
```

## Effect cần Cleanup

Trong một số trường hợp chúng ta cần clean up side effect, ví dụ như add event click vào đối tượng window. Muốn remove event sau khi component được unmount thì chúng ta làm như sau:

```
import React, { useState, useEffect } from 'react';

function Example(){
    useEffect(() => {
        const clickWindow = () => console.log('1')
        window.addEventListener('click', clickWindow)

        // Chỉ định clean up sau khi gọi effect:
        return () => {
            window.removeEventListener('click', clicked)
        }
    }, [])

    return <div>F12 check log của trình duyệt!</div>
}

```

Trả về một function bên trong effect là một tùy chọn để chạy cơ chế cleanup cho effect

Nhìn thì có vẻ giống với componentWillUnmount lifecycle trong class component nhưng có một điểm đáng chú ý là cơ chế cleanup này sẽ chạy mỗi lần re-render, mà không phải khi unmounting.

## Nguồn tham khảo

https://reactjs.org/docs/hooks-effect.html