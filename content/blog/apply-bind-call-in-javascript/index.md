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

Chúng ta có thể đặt những gì `This` được tham chiếu đến, bất kể hàm được gọi như thế nào hoặc ở đâu. Hãy xem điều gì sẽ xảy ra trong trường hợp có một đối tượng. Hàm `fullName()` đang được gọi thông qua đối tượng `person` như hình dưới đây...

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

Tham chiếu đến **`This`** thay đổi đối với đối tượng toàn cục và điều này có thể gây ra các lỗi không mong muốn và khó phát hiện.

Để sử dụng `this` đúng với yêu cầu của mình, chúng ta sử dụng `ABC` trong JavaScript.

## apply() là gì ?
- Phương thức **`apply()`** gọi một hàm với giá trị `this` đã cho và các `arguments` được cung cấp dưới dạng một `array` (hoặc một đối tượng giống `array`).

- Cú pháp: ```func.apply(thisArg, [ argsArray])```
  
  - **`thisArg`**
    
    Giá trị của `this` được cung cấp cho hàm `func`.

    Lưu ý `this` có thể không phải là giá trị thực mà phương thức nhìn thấy: nếu phương thức là một hàm trong `code` có chế độ không nghiêm ngặt, `null` và `undefined` sẽ được thay thế bằng đối tượng toàn cục và các giá trị nguyên thủy sẽ được đóng hộp. `argument` là bắt buộc.

  - **`argsArray`**

    Một đối tượng giống `Array`, chỉ định các `argument` mà `func` sẽ được gọi, hoặc `null` hoặc `undefined` nếu không có `argument` nào được cung cấp cho hàm.

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

- Phương thức `bind()` tạo ra một hàm mới, khi được gọi, từ khóa `this` của nó được đặt thành giá trị được cung cấp, với một chuỗi `argument` nhất định đứng trước bất kỳ `argument` nào được cung cấp khi hàm mới được gọi.

- Cú pháp: ```let Func = func.bind(thisArg[, arg1[, arg2[, ...argN]]])```
  
  - `thisArg`

    Giá trị `this` được truyền dưới dạng tham số cho `func` khi hàm được gọi. 
    
    Giá trị bị bỏ qua nếu hàm được tạo bằng toán tử `new`.
    
    Khi sử dụng `bind` để tạo một hàm (được cung cấp dưới dạng `callback`) bên trong `setTimeout`, bất kỳ giá trị `primitive` nào được truyền dưới dạng `thisArg` sẽ được chuyển đổi thành đối tượng. Nếu không có `argument` nào được cung cấp để `bind`, hoặc nếu `thisArg` là `null` hoặc `undefined`, phạm vi thực thi của `this` được coi là `argument` đầu tiên cho hàm mới.

  - `arg1, arg2, ...argN`

    Các `argument` để thêm vào trước các `argument` được cung cấp cho hàm ràng buộc khi gọi hàm `func`.

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
- Phương thức `call()` gọi một hàm với giá trị `this` đã cho và các `argument` được cung cấp riêng lẻ.

- Cú pháp: ```func.call([thisArg[, arg1, arg2, ...argN]])```

    - `thisArg`: Giá trị `this` sử dụng khi `func` được gọi.

    - `arg1, arg2, ...argN`: là `argument` của hàm.


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

## Nguồn
- `bind()` --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
- `apply()` --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
- `call()` --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
- Javascript’s ABC: Apply, Bind and Call --> https://aparnaj.medium.com/javascripts-abc-apply-bind-and-call-f49164a0df01
## Phần kết luận

Chúng tôi đã biết rằng cách từ khóa `This` hoạt động trong JavaScript khác với các ngôn ngữ hướng đối tượng khác. Các phương thức `call`, `bind` và `apply` có thể được sử dụng để đặt từ khóa `this` độc lập với cách một hàm được gọi.

Vậy là xong và nếu bạn thấy bài viết này hữu ích, vui lòng Share bài viết 👏 để mọi người hiểu hơn về Javascript nhé! Thanks.