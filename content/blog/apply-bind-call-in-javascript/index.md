---
title: Apply, Bind, Call trong Javascript.
date: "2021-03-25T09:41:47.044Z"
description: "Trong bài này chúng ta sẽ cùng tìm hiểu về cách hoạt động của 'Apply', 'Bind', 'Call' trong javascript."
tags: ["Javascript"]
---

# ABC trong jsvascript là gì ?

- A --> **apply()**
- B --> **bind()**
- C --> **call()**

Ba hàm `call`, `apply` và `bind` là các `prototype` của `Function`. Nên chỉ có `Function` mới có thể gọi được 3 hàm này. Hãy xem điều gì sẽ xảy ra trong trường hợp có một đối tượng. Hàm `fullName()` đang được gọi thông qua đối tượng `person` như hình dưới đây...

```
    const person = {
        firstName: 'Gia Lys',
        lastName: 'Nguyen',
        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        }
    }
    person.fullName(); //Gia Lys Nguyen
```

Do đó, **`this`** được sử dụng bên trong hàm sẽ tham chiếu đến đối tượng **`person`**. Điều gì sẽ xảy ra nếu chúng ta gán hàm **`fullName`** cho một biến có phạm vi toàn cục là **`getFullName`** và sau đó gọi nó như bên dưới ...

```
    const person = {
        firstName: 'Gia Lys',
        lastName: 'Nguyen',
        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        }
    }

    const getFullName = person.fullName; 
    getFullName(); 
    // Không in bất cứ thứ gì
    // 'this' hiện tại đang tham chiếu đến đối tưởng toàn cục(window)
    // bởi vì 'getFullName' là toàn cục nên 'person.fullName' đang được gọi đến toàn cục.
```

Để sử dụng `this` đúng với yêu cầu của mình, chúng ta sử dụng `ABC` trong JavaScript.

## apply() là gì ?
- Phương thức **`apply()`** nó cho phép truyền vào tham số là 1 đối tượng và các `arguments` được cung cấp dưới dạng một `array` (hoặc một đối tượng giống `array`).

- Cú pháp: ```func.apply(thisArg, [ argsArray])```

- ví dụ:
```
    const person1 = { name: 'Ly', age: 18 }
    const person2 = { name: 'Anh', age: 17 }

    function gettingInfo(text) {
        return `${text}, ${this.name} --> ${this.age} tuổi`;
    }

    gettingInfo.apply(person1, ['Hello']);
    // "Hello, Ly --> 18 tuổi"
    gettingInfo.apply(person2, ['Hi]);
    // "Hi, Anh --> 17 tuổi"
```


## bind() là gì ?

- Phương thức `bind()` tạo ra một hàm mới, nó cho phép truyền vào tham số là 1 đối tượng và các `arguments` cách nhau 1 dấu phẩy.

- Cú pháp: ```let Func = func.bind(thisArg[, arg1[, arg2[, ...argN]]])```

- Ví dụ:
    ```
        this.number = 7;    // 'this' đang được tham chiếu đến đối tượng 'window' toàn cầu trong trình duyệt.
        const module = {
            number: 9,
            getNumber: function() { return this.number; }
        };

        module.getNumber();
        //  returns 9;

        const result = module.getNumber;
        result();
        //  returns 7; hàm được gọi ở phạm vi toàn cục

        //  Tạo một hàm mới với 'this' được liên kết với 'module'
        //  Các bạn mới có thể nhầm lẫn
        //  biến toàn cục 'number' với thuộc tính của module 'number'

        const getNumbers = result.bind(module);
        getNumbers();
        //  returns 9;
    ```


## call() là gì ?
- `call` cho phép truyền vào tham số là 1 đối tượng và các `arguments` cách nhau 1 dấu phẩy.

- Cú pháp: ```func.call([thisArg[, arg1, arg2, ...argN]])```

- ví dụ:


    `1. Sử dụng lệnh gọi, để gọi một hàm và chỉ định ngữ cảnh cho 'this'`

    ```
        function desc() {
            const reply = [this.name, 'beautiful', this.girl].join(' ');
            console.log(reply);
        }

        const obj = {
            animal: 'Lý', girl: 'girl'
        };

        desc.call(obj);  // Lý beautiful girl
    ```

    `2. gọi 1 hàm và không có đối số ở chế độ 'không' nghiêm ngặt`.

    ```
        let name = 'Sếp';

        function fullName() {
            console.log('name value is %s ', this.name);
        }

        fullName.call();  // name value is Sếp
    ```

    `3. gọi 1 hàm và không có đối số ở chế độ nghiêm ngặt`.

    ```
        'use strict';

        let name = 'Sếp';

        function fullName() {
            console.log('name value is %s ', this.name);
        }

        fullName.call();  // Cannot read the property of 'name' of undefined
    ```

**`Lưu ý`**
  - `Arrow Funtion` không dùng được tất cả phương thức như hàm `funtion` bình thường.
  - `This` của `arrow function` được xác định ở môi trường nó được khởi tạo. Còn `This` của `function` được xác định ở môi trường thực thi của nó.
  - `Arrow Funtion` không tạo ra ngữ cảnh `this` của riêng hàm, thế nên `this` có ý nghĩa trong ngữ cảnh bọc quanh nó.
  - Ở chế độ `Strict Mode` thì `this` của `arrow function` luôn luôn là `undefined`.


## Nguồn
- `bind()` --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
- `apply()` --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
- `call()` --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
- `Javascript’s ABC: Apply, Bind and Call` --> https://dev.to/rahxuls/abc-of-javascript-50h3

## Phần kết luận

Chúng tôi đã biết rằng cách từ khóa `This` hoạt động trong JavaScript khác với các ngôn ngữ hướng đối tượng khác. Các phương thức `call`, `bind` và `apply` có thể được sử dụng để đặt từ khóa `this` độc lập với cách một hàm được gọi.

Vậy là xong và nếu bạn thấy bài viết này hữu ích, vui lòng Share bài viết 👏 để mọi người hiểu hơn về Javascript nhé! Thanks.