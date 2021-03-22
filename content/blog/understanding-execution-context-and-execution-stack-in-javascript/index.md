---
title: Tìm Hiểu ngữ cảnh thực thi và ngăn xếp(Stack) thực thi trong Javascript.
date: "2021-03-22T14:31:54.733Z"
description: "Trong bài này chúng ta sẽ cùng tìm hiểu về ngữ cảnh thực thi và ngăn xếp thực thi, nó rất quan trọng để hiểu các khái niệm JavaScript khác như Hoisting, Scope và Closures."
tags: ["Javascript"]
---

## **Ngữ cảnh thực thi là gì?** (Execution Context)

Nói một cách đơn giản, ngữ cảnh thực thi là một khái niệm trừu tượng về một môi trường mà mã Javascript được đánh giá và thực thi. Bất cứ khi nào bất kỳ mã nào được chạy bằng JavaScript, mã đó sẽ chạy bên trong ngữ cảnh thực thi.

### **Các loại ngữ cảnh thực thi**
Có ba loại ngữ cảnh thực thi trong JavaScript.

- **Ngữ cảnh thực thi toàn cầu --** Đây là ngữ cảnh thực thi mặc định. Mã không nằm trong bất kỳ hàm nào nằm trong ngữ cảnh thực thi toàn cục. Nó thực hiện hai việc: nó tạo ra một đối tượng toàn cục là một đối tượng cửa sổ(window) (trong trường hợp của các trình duyệt) và đặt giá trị của nó bằng đối tượng toàn cục. Chỉ có thể có một ngữ cảnh thực thi chung trong một chương trình.

- **Ngữ cảnh thực thi chức năng --** Mỗi khi một hàm được gọi, một ngữ cảnh thực thi hoàn toàn mới sẽ được tạo cho hàm đó. Mỗi hàm có ngữ cảnh thực thi riêng, nhưng nó được tạo khi hàm được gọi hoặc gọi. Có thể có bất kỳ số lượng ngữ cảnh thực thi chức năng nào. Bất cứ khi nào một bối cảnh thực thi mới được tạo, nó sẽ trải qua một loạt các bước theo thứ tự xác định mà tôi sẽ trình bày ở phần sau của bài viết này.

- **Đánh giá ngữ cảnh thực thi chức năng --** Mã được thực thi bên trong một hàm `eval` cũng nhận được ngữ cảnh thực thi của riêng nó, nhưng vì `eval` không thường được sử dụng bởi các nhà phát triển JavaScript, vì vậy tôi sẽ không thảo luận về nó ở đây.

### **Ngăn xếp(Stack) thực thi** 
Ngăn xếp thực thi, còn được gọi là `"calling stack"` trong các ngôn ngữ lập trình khác, là một ngăn xếp có cấu trúc LIFO (Last In, First Out -> vào sau, ra trước), được sử dụng để lưu trữ tất cả các ngữ cảnh thực thi được tạo trong quá trình thực thi mã.

Khi công cụ JavaScript gặp tập lệnh của bạn lần đầu tiên, nó tạo ngữ cảnh thực thi toàn cục và đẩy nó vào ngăn xếp thực thi hiện tại. Bất cứ khi nào công cụ JavaScript tìm thấy một lệnh gọi hàm, nó sẽ tạo một ngữ cảnh thực thi mới cho hàm đó và đẩy nó lên đầu ngăn xếp.

Công cụ thực thi chức năng có ngữ cảnh thực thi ở trên cùng của ngăn xếp. Khi chức năng này hoàn thành, ngăn xếp thực thi của nó sẽ xuất hiện từ ngăn xếp và điều khiển đạt đến ngữ cảnh bên dưới nó trong ngăn xếp hiện tại.

Hãy hiểu điều này với một ví dụ mã bên dưới:

```
    let a = 'Hello World!';

    function first() {
        console.log('Inside first function');
        second();
        console.log('Again inside first function');
    }

    function second() {
        console.log('Inside second function');
    }

    first();
    console.log('Inside Global Execution Context');
```

Khi mã trên tải trong trình duyệt, công cụ Javascript sẽ tạo ngữ cảnh thực thi toàn cục và đẩy nó vào ngăn xếp thực thi hiện tại. Khi một lệnh gọi đến `first()` gặp phải, các công cụ Javascript sẽ tạo một ngữ cảnh thực thi mới cho hàm đó và đẩy nó lên đầu ngăn xếp thực thi hiện tại.

Khi hàm `second()` được gọi từ bên trong hàm `first()`, công cụ Javascript tạo một ngữ cảnh thực thi mới cho hàm đó và đẩy nó lên đầu ngăn xếp thực thi hiện tại. Khi hàm `second()` kết thúc, ngữ cảnh thực thi của nó sẽ xuất hiện từ ngăn xếp hiện tại và điều khiển đi đến ngữ cảnh thực thi bên dưới nó, đó là ngữ cảnh thực thi hàm `first()`.

Khi `first()` kết thúc, ngăn xếp thực thi của nó bị xóa khỏi ngăn xếp và điều khiển đạt đến ngữ cảnh thực thi toàn cục. Khi tất cả mã được thực thi, công cụ JavaScript sẽ xóa bối cảnh thực thi toàn cục khỏi ngăn xếp hiện tại.

#### **Ngữ cảnh thực thi được tạo ra như thế nào?**
Cho đến bây giờ, chúng ta đã thấy cách công cụ JavaScript quản lý ngữ cảnh thực thi, Bây giờ chúng ta hãy hiểu cách công cụ JavaScript tạo ngữ cảnh thực thi.

Ngữ cảnh thực thi được tạo trong hai giai đoạn: **1) Giai đoạn tạo** và **2) Giai đoạn thực thi**.

##### **Giai đoạn tạo**
Ngữ cảnh thực thi được tạo trong giai đoạn tạo. Những điều sau đây xảy ra trong giai đoạn tạo:

1. **LexicalEnvironment** thành phần môi trường lexical được tạo.
2. **VariableEnvironment** Thành phần môi trường biến được tạo ra.

Vì vậy, ngữ cảnh thực thi có thể được biểu diễn về mặt khái niệm như sau:

```
    ExecutionContext = {
        LexicalEnvironment = <ref. to LexicalEnvironment in memory>,
        VariableEnvironment = <ref. to VariableEnvironment in  memory>,
    }
```

**1. Môi Trường Lexical**
Các tài liệu chính thức của ES6 định nghĩa Môi trường Lexical là

```
    A Lexical Environment is a specification type used to define the association of Identifiers to specific variables and functions based upon the lexical nesting structure of ECMAScript code. A Lexical Environment consists of an Environment Record and a possibly null reference to an outer Lexical Environment.
```

Nói một cách đơn giản, Môi trường Lexical là một cấu trúc chứa ánh xạ biến định danh (ở đây định danh đề cập đến tên của các biến / hàm, và biến là tham chiếu đến đối tượng thực tế [bao gồm đối tượng hàm và đối tượng mảng] hoặc giá trị nguyên thủy).

Ví dụ: hãy xem xét đoạn mã sau:

```
    var a = 20;
    var b = 40;

    function foo() {
        console.log('bar');
    }
```

Vì vậy, môi trường lexical cho đoạn mã trên trông giống như sau:

```
    lexicalEnvironment = {
        a: 20,
        b: 40,
        foo: <ref. to foo function>
    }
```

Mỗi Môi trường Lexical có ba thành phần:

1. Bản ghi môi trường.
2. Tham chiếu đến môi trường bên ngoài.
3. Sự ràng buộc `This`.

**Bản ghi môi trường** (Environment Record)
Bản ghi môi trường là nơi lưu trữ các khai báo biến và hàm bên trong môi trường lexical.

Cũng có hai loại bản ghi môi trường:

**Bản ghi môi trường khai báo (Declarative environment record) --** Như tên gọi của nó cho thấy lưu trữ các khai báo biến và hàm. Môi trường lexical cho mã hàm chứa bản ghi môi trường khai báo.
**Bản ghi môi trường đối tượng (Object environment record) --** Môi trường lexical cho mã toàn cục chứa một bản ghi môi trường. Ngoài khai báo biến và hàm, bản ghi môi trường đối tượng cũng lưu trữ một đối tượng liên kết toàn cục (window) (đối tượng cửa sổ trong trình duyệt). Vì vậy, đối với mỗi thuộc tính của đối tượng ràng buộc (trong trường hợp trình duyệt, nó chứa các thuộc tính và phương thức do trình duyệt cung cấp cho đối tượng cửa sổ), một mục nhập mới sẽ được tạo trong bản ghi.

Lưu ý - Đối với mã hàm, bản ghi môi trường cũng chứa đối tượng đối số chứa ánh xạ giữa các chỉ mục và đối số được truyền cho hàm và độ dài (số) của đối số được truyền vào hàm.

Ví dụ, một đối tượng đối số cho hàm dưới đây trông giống như sau:

```
    function foo(a, b) {
        var c = a + b;
    }

    foo(2, 3);
    // argument object
    Arguments: {0: 2, 1: 3, length: 2}
```

**Tham chiếu đến Môi trường bên ngoài** (Reference to the Outer Environment)
Tham chiếu đến môi trường bên ngoài có nghĩa là nó có quyền truy cập vào môi trường lexical bên ngoài của nó. Điều đó có nghĩa là công cụ JavaScript có thể tìm kiếm các biến bên trong môi trường bên ngoài nếu chúng không được tìm thấy trong môi trường lexical hiện tại.

**Ràng buộc** (This Binding)
Trong thành phần này, giá trị của `this` được xác định hoặc đặt.

Trong bối cảnh thực thi toàn cục, giá trị của `this` đề cập đến đối tượng toàn cục. (trong các trình duyệt, `this` đề cập đến Đối tượng Cửa sổ(Window Object)).

Trong ngữ cảnh thực thi hàm, giá trị của điều này phụ thuộc vào cách hàm được gọi. Nếu nó được gọi bởi một tham chiếu đối tượng, thì giá trị của `this` được đặt cho đối tượng đó, nếu không, giá trị của `this` được đặt thành đối tượng toàn cục hoặc không xác định (ở chế độ nghiêm ngặt). Ví dụ:

```
    const person = {
        name: 'peter',
        birthYear: 1994,
        calcAge: function() {
            console.log(2018 - this.birthYear);
        }
    }

    person.calcAge(); 
    // 'this' đề cập đến 'person', vì 'calcAge' được gọi bằng tham chiếu đối tượng 'person'

    const calculateAge = person.calcAge;
    calculateAge();
    // 'this' đề cập đến đối tượng cửa sổ toàn cầu, vì không có tham chiếu đối tượng nào được cung cấp
```

Tóm lại, môi trường lexical trông giống như thế này trong mã này:

```
    GlobalExectionContext = {
        LexicalEnvironment: {
            EnvironmentRecord: {
                Type: "Object",
                // Các liên kết định danh tại đây
            }
            outer: <null>,
            this: <đối tượng toàn cầu>
        }
    }
    FunctionExectionContext = {
        LexicalEnvironment: {
            EnvironmentRecord: {
                Type: "Declarative",
                // Các liên kết định danh tại đây
            }
            outer: <Tham chiếu môi trường chức năng toàn cầu hoặc bên ngoài>,
            this: <phụ thuộc vào cách gọi hàm>
        }
    }
```

**2. Môi trường biến**
Nó cũng là một Môi trường Lexical có EnvironmentRecord giữ các liên kết được tạo bởi VariableStatements trong ngữ cảnh thực thi này.

Như đã viết ở trên, môi trường biến cũng là một môi trường lexical, Vì vậy, nó có tất cả các thuộc tính và thành phần của một môi trường lexical như đã định nghĩa ở trên.

Trong ES6, một điểm khác biệt giữa thành phần **LexicalEnvironment** và thành phần **VariableEnvironment** là cái trước đây được sử dụng để lưu trữ khai báo hàm và các ràng buộc biến (let và const). trong khi cái sau chỉ được sử dụng để lưu trữ các liên kết biến (var).

##### **Giai đoạn thực hiện**
Trong giai đoạn này, việc gán cho tất cả các biến đó đã được thực hiện và mã cuối cùng được thực thi.

**Ví Dụ**
Hãy xem một số ví dụ để hiểu các khái niệm trên:

```
    let a = 20;
    const b = 30;
    var c;

    function multiply(e, f) {
        var g = 20;
        return e * f * g;
    }

    c = multiply(20, 30);
```

Khi đoạn mã trên được thực thi, công cụ JavaScript sẽ tạo một ngữ cảnh thực thi toàn cục để thực thi mã chung. Vì vậy, ngữ cảnh thực thi toàn cục sẽ trông giống như thế này trong giai đoạn tạo:

```
    GlobalExectionContext = {

        LexicalEnvironment: {
            EnvironmentRecord: {
                Type: "Object",
                // Identifier bindings go here
                a: < uninitialized >,
                b: < uninitialized >,
                multiply: < func >
            }
            outer: <null>,
            ThisBinding: <Global Object>
        },

        VariableEnvironment: {
            EnvironmentRecord: {
                Type: "Object",
                // Identifier bindings go here
                c: undefined,
            }
            outer: <null>,
            ThisBinding: <Global Object>
        }
    }
```

Trong giai đoạn thực thi, các phép gán biến được thực hiện. Vì vậy, ngữ cảnh thực thi toàn cục sẽ trông giống như thế này trong giai đoạn thực thi.

```
    GlobalExectionContext = {

        LexicalEnvironment: {
            EnvironmentRecord: {
                Type: "Object",
                // Identifier bindings go here
                a: 20,
                b: 30,
                multiply: < func >
            }
            outer: <null>,
            ThisBinding: <Global Object>
        },

        VariableEnvironment: {
            EnvironmentRecord: {
                Type: "Object",
                // Identifier bindings go here
                c: undefined,
            }
            outer: <null>,
            ThisBinding: <Global Object>
        }
    }
```

Khi một lệnh gọi hàm  `multiply(20, 30)` gặp phải, một ngữ cảnh thực thi hàm mới được tạo để thực thi mã hàm. Vì vậy, ngữ cảnh thực thi hàm sẽ trông giống như thế này trong giai đoạn tạo:

```
    FunctionExectionContext = {

        LexicalEnvironment: {
            EnvironmentRecord: {
                Type: "Declarative",
                // Identifier bindings go here
                Arguments: {0: 20, 1: 30, length: 2},
            },
            outer: <GlobalLexicalEnvironment>,
            ThisBinding: <Global Object or undefined>,
        },

        VariableEnvironment: {
            EnvironmentRecord: {
                Type: "Declarative",
                // Identifier bindings go here
                g: undefined
            },
            outer: <GlobalLexicalEnvironment>,
            ThisBinding: <Global Object or undefined>
        }
    }
```

Sau đó, ngữ cảnh thực thi chuyển qua giai đoạn thực thi có nghĩa là việc gán cho các biến bên trong hàm được thực hiện. Vì vậy, ngữ cảnh thực thi hàm sẽ trông giống như thế này trong giai đoạn thực thi:

```
    FunctionExectionContext = {
        LexicalEnvironment: {
            EnvironmentRecord: {
                Type: "Declarative",
                // Identifier bindings go here
                Arguments: {0: 20, 1: 30, length: 2},
            },
            outer: <GlobalLexicalEnvironment>,
            ThisBinding: <Global Object or undefined>,
        },
        VariableEnvironment: {
            EnvironmentRecord: {
                Type: "Declarative",
                // Identifier bindings go here
                g: 20
            },
            outer: <GlobalLexicalEnvironment>,
            ThisBinding: <Global Object or undefined>
        }
    }
```

Sau khi hàm hoàn thành, giá trị trả về được lưu trữ bên trong `c`. Vì vậy, môi trường lexical toàn cầu được cập nhật. Sau đó, mã toàn cục hoàn thành và chương trình kết thúc.

Lưu ý - Như bạn có thể nhận thấy rằng các biến được định nghĩa `let` và `const` không có bất kỳ giá trị nào được liên kết với chúng trong giai đoạn tạo, nhưng các biến được xác định `var` được đặt thành `undefined`.

Điều này là do, trong giai đoạn tạo, mã được quét để tìm các khai báo biến và hàm, trong khi khai báo hàm được lưu trữ toàn bộ trong môi trường, ban đầu các biến được đặt thành không xác định (trong trường hợp `var`) hoặc vẫn chưa được khởi tạo (trong trường hợp `let` và `const`).

Đây là lý do tại sao bạn có thể truy cập các biến được xác định `var` trước khi chúng được khai báo (mặc dù chưa được xác định) nhưng lại gặp lỗi tham chiếu khi truy cập các biến `let` và `const` trước khi chúng được khai báo.

Đây là, những gì chúng tôi gọi là `Hoisting`.

Lưu ý - Trong giai đoạn thực thi, nếu công cụ JavaScript không thể tìm thấy giá trị của biến `let` tại vị trí thực tế mà nó được khai báo trong mã nguồn, thì nó sẽ gán cho nó giá trị không xác định (`undefined`).

### **Phần kết luận**
Vì vậy, chúng ta đã thảo luận về cách các chương trình JavaScript được thực thi nội bộ. Mặc dù bạn không cần thiết phải học tất cả các khái niệm này để trở thành một nhà phát triển JavaScript tuyệt vời, Việc hiểu rõ các khái niệm trên sẽ giúp bạn hiểu các khái niệm khác như `Hoisting`, `Scope`, `Closures` một cách dễ dàng và sâu sắc hơn.

Vậy là xong và nếu bạn thấy bài viết này hữu ích, vui lòng Share bài viết 👏 để mọi người hiểu hơn về Javascript nhé! Thanks.
