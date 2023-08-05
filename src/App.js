import { useState } from "react";

export default function App() {
  const[items,setItems]=useState([]);
  function handleAddItem(item){
    setItems((items)=>[...items,item]);

  }

  function handleDeletItem(id){
    setItems((items)=>(items.filter(item=>item.id!== id)))
  }


  function hanldleToogle(id){
    setItems((items)=>items.map((item)=>item.id===id?{...item ,packed:!item.packed} : item));

  }

  return (
    <>    
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList  items={items} onDeletItems={handleDeletItem}  onToggleItem={hanldleToogle}/ >
      <Status />
    </>
  ); 
}



function Logo() {
  return <h1>Far Away🌴🛩️</h1>;
}

function Form({onAddItems}) {

  const [desc,setDesc]=useState("");
  const [quantity,setQuantity]=useState(1);
  


  
  function handleSubmit(e){
    e.preventDefault();
    if(!desc) return;
    const newItem={
      desc,quantity,packed:false,id:Date.now()
    }

    console.log(newItem);  
    onAddItems(newItem);
    setDesc('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Whate you need to pack for your trip💼</h3>
      <select value={quantity} onChange={(e)=>setQuantity(e.target.value)} >
         {Array.from({length:20},(_,i)=>i+1).map((num)=>(
          <option  value={num} key={num}>
            {num}
          </option>
         ))}
      </select>
      <input type="text" placeholder="Item..."  value={desc} onChange={(e)=>setDesc(e.target.value)}  />
      <button>Add</button>
    </form>
  );
}

function Item({ item ,onDeletItems,onToggleItem}) {
  return (
    <li>
      <input type="checkbox" value={item.packed}  onChange={()=>onToggleItem(item.id)}/>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}  {item.desc}
      </span>
      <button onClick={()=>onDeletItems(item.id)}>❌</button>
    </li>
  );
}

function PackingList({items,onDeletItems,onToggleItem}) {
  return (
    <div className="list"> 
      <ol>
        {items.map((item) => (
          <Item item={item}  onDeletItems={onDeletItems} onToggleItem={onToggleItem}
           key={item.id}/>
        ))}
      </ol>
    </div>
  );
}

function Status() {
  return (
    <footer className="stats">
      <em>you have x items in your list, and you have already pack x </em>
    </footer>
  );
}
