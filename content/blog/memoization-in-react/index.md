---
title: "TẠI SAO CHÚNG TA KHÔNG NÊN SỬ DỤNG MEMO TRONG REACT !?"
description: "Lúc mình mới làm việc với React và lần đầu tiên biết đến memo mình đã trầm trồ và ngưỡng mộ những anh dev của Facebook, tại sao mấy ảnh lại nghĩ ra được những tính năng thú vị và có ích như vậy :)) nhưng khi tìm hiểu sâu hơn một tí mình đã vỡ mộng khi biết ý tưởng đó thực ra đã có từ rất lâu trong lập trình máy tính. Và bài viết hôm nay mình xin được giới thiệu về Memoization - một kĩ thuật có thể giúp các bạn tối ưu performance và cách áp dụng nó vào React"
tags: ["React", "memoization"]
---

## Giới thiệu

Lúc mình mới làm việc với React và lần đầu tiên biết đến memo mình đã trầm trồ và ngưỡng mộ những anh dev của Facebook, tại sao mấy ảnh lại nghĩ ra được những tính năng thú vị và có ích như vậy :)) nhưng khi tìm hiểu sâu hơn một tí mình đã vỡ mộng khi biết ý tưởng đó thực ra đã có từ rất lâu trong lập trình máy tính. Và bài viết hôm nay mình xin được giới thiệu về Memoization - một kĩ thuật có thể giúp các bạn tối ưu performance và cách áp dụng nó vào React

## Memoization

Trong lập trình máy tính, memoization là một kĩ thuật tối ưu hoá được sử dụng để lưu trữ kết quả của những phép tính tiêu hao nhiều tài nguyên (loop ở số lượng phần tử lớn, hoặc làm việc với videos hoặc images). Khi một hàm “memoized“ (memoized function) được thực thi từ lần thứ 2 trở đi, nếu như đầu vào (inputs) của hàm không thay đổi, thì kết quả được lưu trữ (cached results) sẽ được trả về mà không cần phải lặp lại phép tính phức tạp kia

Nếu vẫn còn hỏi khó hiểu, mình sẽ cho một ví dụ thực tế để bạn dễ hình dung
Vào một ngày đẹp trời, bạn quyết định mang đôi giày mới đặt mua trên mạng để đi công viên chơi. Có một người tới hỏi bạn đôi giày này mua ở đâu mà đẹp thế. Lần đầu được đặt câu hỏi, bạn phải bật điện thoại lục lại đơn đặt hàng để tìm lại thông tin shop (giả sử như bạn chẳng nhớ là mình mua ở đâu đi), nhưng xui quá bạn không có 3g, vì bạn là người tốt :v nên chạy qua quán cafe gần đó, bắt wifi, tìm đơn đặt hàng và trả lời họ. Nhưng vì đôi giày của bạn quá đẹp, ngày càng nhiều người hỏi về nó, nên bạn phải ghi nhớ luôn thông tin của shop để trả lời mọi người mà không cần phải lặp lại những thao tác lằng nhằng kia nữa.

Có 3 thứ bạn cần nắm để hiểu về Memoization:

- Input: câu hỏi về thông tin đôi giày
- Memoized function: Một đống thao tác lằng nhằng để tìm lại thông tin của shop
- Cached results: Thông tin shop

Memoization đơn giản là nếu input không thay đổi, thì memoized function chỉ cần thực hiện một lần và lưu lại cached results để sử dụng cho những cần sau. Dễ hiểu phải không nào.

Nếu hiểu ví dụ trên, mình tin là bạn sẽ nhanh chóng nắm được những kĩ thuật memoization mà react cung cấp

## Memoization trong React

Trong react-hook có 3 API để bạn thực hiện kĩ thuật memoization đó là React.memo, useMemo và useCallback

## React.memo

React.memo là một higher order component. 
Nếu Component của bạn trả về cùng một kết quả với cùng props truyền vào thì bạn có thể bọc chúng trong React.memo để giúp tăng hiệu suất trong một số trường hợp bằng cách ghi nhớ kết quả. Điều này có nghĩa là React sẽ bỏ qua việc render component và sử dụng lại kết quả được render cuối cùng.

React.memo chỉ kiểm tra các thay đổi của props. Nếu Component của bạn được bọc bởi React.memo có một useState, useReducer hoặc useContext Hook thì nó vẫn render lại khi state hoặc context thay đổi.

Theo mặc định, React.memo sẽ chỉ làm shallowly compare đối với các object phức tạp trong props object. Nếu bạn muốn kiểm soát việc compare, bạn cũng có thể cung cấp một custom comparison function ở tham số thứ hai của React.memo

```
function MyComponent(props) {
  /* Render sử dụng props */
}

function areEqual(prevProps, nextProps) {
  /* Trả về true nếu nextProps bằng prevProps, ngược lại trả về false */
}

export default React.memo(MyComponent, areEqual);
```

Và đây cũng là cách duy nhất để chặn re-render component không cần thiết trong react-hook

Ví dụ: Giả sử bạn muốn show một list user và không muốn component User re-render mỗi khi nhập vào ô search


```
const User = React.memo(
  ({user}) => {
    return <li>
      {user.firstName} {user.lastName}
    </li>
  },
  (prevProp, nextProps) => {
    // vì react chỉ shallowly compare nên chúng ta phải so sánh từng property nếu không muốn bị re-render nhé
    return prevProp.firstName !== nextProps.lastName || 
        prevProp.firstName !== nextProps.lastName
  }
)

const ListUsers = () => {
  const [search, setSearch] = useState('')

  const listUsers = [
    {
      firstName: 'Nguyễn Đình',
      lastName: 'Phúc'
    },
    {
      firstName: 'Nguyễn Gia',
      lastName: 'Lý
    }
  ]

  return <div>
    <input value={state.search} onChange={(e)=>setSeach(e.target.value)} />
    {
      listUser.map(user => {
        return <User user={user} />
      })
    }
  </div>
} 
```

## useMemo

```
const cachedResults = useMemo(() => memoizedFunction(a, b), [a, b]);
```

useMemo cho phép chúng ta truyền vào một function (Memoized function) và array of dependencies (bạn có thể hiểu là input).
useMemo chỉ thực thi lại memoizedFunction khi một trong những dependencies truyền vào bị thay đổi. Cách này giúp tránh những tính toán phức tạp trong mỗi lần render

Cuối cùng useMemo sẽ trả ra kết quả của memoizedFunction tính toán được. Nếu bạn không truyền vào array of dependencies, cachedResults sẽ được tính toán lại mỗi lần re-render

Okay, xong lý thuyết là phải thực hành, vẫn tiếp tục ví dụ trên nhé, nhưng chúng ta muốn lọc ra những thằng có tên là "Lý" chẳng hạn, nhưng lại không muốn phải thực hiện lại việc lọc mỗi lần nhập vào ô search. Ở trường hợp này chúng ta có thể áp dụng useMemo như sau:

```
const ListUser = () => {
  ...
  const listUserFilter = useMemo(() => {
    return listUser.filter(user => return !user.lastName.includes('Lý'))
  }, [listUser])
  ...
}
```

## useCallback

```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

Cũng giống như useMemo, useCallback cho chúng ta truyền vào 2 tham số, một Memoized function và array of dependencies. Vẫn theo nguyên tắc chỉ khi dependencies thay đổi thì mới thực thi Memoized function, nhưng khác ở chổ useCallback sẽ trả ra chính Memoized function. Cách này giúp ngăn Memoized function của chúng ta bị tạo lại và thay đổi con trỏ trên mỗi lần render. 

Đôi khi chúng ta cũng không quan tâm lắm tới việc function có bị khởi tạo lại hay không, nhưng nó lại giúp ích khá nhiều trong trường hợp bạn muốn truyền function vào props của component con đấy. Vì nguyên tắc của react là props thay đổi sẽ re-render lại component, nếu function đó không bị khởi tạo lại thì chúng ta cũng tránh được những lần re-render component con không cần thiết.

Okay, mình lại tiếp tục áp dụng useCallback vào ví dụ trên. Giả sử chúng ta muốn click vào user nào thì active user đó lên đi. Mình sẽ dùng useCallback để chặn không cho hàm setActiveId được khởi tạo lại, tránh để component User bị re-render

```
const ListUsers = () => {
  const [search, setSearch] = useState('')
  const [state, setState] = useState({
    activeId: ''
  })

  const listUsers = [
      {
        id: '1',
        firstName: 'Nguyễn Đình',
        lastName: 'Phúc'
      },
      {
        id: '2',
        firstName: 'Nguyễn Gia',
        lastName: 'Lý'
      }
  ]

  const setActiveId = useCallback((id) => {
    setState({activeId: id})
  }, [search])

  return <div>
      <input value={state.search} onChange={(e)=>setSeach(e.target.value)} />
      {
        listUser.map(user => {
          return <User setActiveId={setActiveId} user={user} />
        })
      }
    </div>
} 
```

Và bên trong component User cần kết hợp với React.memo để như sau:

```
const User = React.memo(
  ({user, setActiveId}) => {
    return <li onClick={()=> setActiveId(user.id)}>
      {user.firstName} {user.lastName}
    </li>
  }
)
```

## Góc phản biện: Chúng ta vẫn có thể hạn chế re-render trong những trường hợp trên mà không cần dùng memo !!??

### Cách thứ nhất: Tách Component

Một ví dụ đơn giản như sau

```
export default function App() {
  let [color, setColor] = useState('red');
  return (
    <div>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
      <SomeComponent />
    </div>
  );
}
```

Vẫn vấn đề cũ, bạn không muốn cái `SomeComponent` không bị re-render mỗi khi nhập `color` và ô input. Bạn chỉ việc tách cái tụi cần phụ thuộc vào state `color` ra một component khác, để nó một mình nó tự re-render :)

```
export default function App() {
  return (
    <>
      <ChangeColor />
      <SomeComponent />
    </>
  );
}

function ChangeColor() {
  let [color, setColor] = useState('red');
  return (
    <>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
    </>
  );
}
```

Xong, vấn đề đã được giải quyết!

### Cách thứ 2

Giả sử chúng ta muốn cái `color` được set ở div cha thì sao ?

```
export default function App() {
  let [color, setColor] = useState('red');
  return (
    <div style={{ color }}>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p>Hello, world!</p>
      <SomeComponent />
    </div>
  );
}
```

Khó rồi phải không, trường hợp này thì không thể tách như trên được nữa.
Bạn có thể dùng React.memo để bọc SomeComponent lại cho nó khỏi bị re-render theo `color`. Nhưng ở đây mình chỉ bạn một tip khác

```
export default function App() {
  return (
    <ChangeColor>
      <p>Hello, world!</p>
      <SomeComponent />
    </ChangeColor>
  );
}

function ChangeColor({ children }) {
  let [color, setColor] = useState("red");
  return (
    <div style={{ color }}>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      {children}
    </div>
  );
}
```

Chúng ta tách `App` component ra thành 2 component, `<ChangeColor/>` sẽ phụ thuộc vào state `color` và đương nhiên sẽ bị re-render khi state thay đổi.
Còn thằng `<SomeComponent/>` của chúng ta sẽ không quan tâm tới state `color` và được truyền vào từ props children của `<ChangeColor/>`.
Khi state `color` bị thay đổi, component `<ChangeColor/>` sẽ bị re-render nhưng props `children` được truyền từ `App` vào vẫn không bị thay đổi, vì thế `<SomeComponent/>` của chúng ta vẫn không bị re-render. Yayyyy !!!

## Túm lại

Như vậy là qua một blog khá dài, các bạn đã nắm được sức mạnh của kĩ thuật memoization, cách sử dụng các "memo" để áp dụng vào ReactApp của mình.
Nhưng đôi khi nó cũng sẽ có hại (cái gì nhiều quá thì cũng không tốt), để giảm một phần xử lý thì React phải đánh đổi một phần bộ nhớ để lưu trữ biến đó cho những lần sử dụng tiếp theo, ở những trường hợp như vậy bạn có thể sử dụng 2 tip đơn giản mà mình cung cấp như trên.

Và cuối cùng chúc mừng bạn đã đọc hết một bài viết khá là dài của mình. Hi vọng bài viết trên sẽ giúp ích cho các bạn trong việc tối ưu ReactApp của mình nhé

Byeee!

## Resources

- https://reactjs.org/docs/hooks-reference.html#usememo
- https://overreacted.io/before-you-memo/#solution-2-lift-content-up