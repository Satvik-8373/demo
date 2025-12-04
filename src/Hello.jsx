import React, { memo, useEffect, useState } from 'react'

const Hello = memo(() => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('items')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  const [form, setForm] = useState({ name: '', price: '', quantity: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem('items', JSON.stringify(items))
    } catch (e) {}
  }, [items])

  const resetForm = () => setForm({ name: '', price: '', quantity: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  const handleCreate = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return alert('Please enter a name')
    const price = parseFloat(form.price) || 0
    const quantity = parseInt(form.quantity, 10) || 0
    const newItem = { id: Date.now(), name: form.name.trim(), price, quantity }
    setItems((prev) => [newItem, ...prev])
    resetForm()
  }

  const handleDelete = (id) => {
    if (!window.confirm('Delete this item?')) return
    setItems((prev) => prev.filter((it) => it.id !== id))
    if (editingId === id) {
      setEditingId(null)
      resetForm()
      
    }
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setForm({ name: item.name, price: String(item.price), quantity: String(item.quantity) })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    if (editingId == null) return
    if (!form.name.trim()) return alert('Please enter a name')
    const price = parseFloat(form.price) || 0
    const quantity = parseInt(form.quantity, 10) || 0
    setItems((prev) => prev.map((it) => (it.id === editingId ? { ...it, name: form.name.trim(), price, quantity } : it)))
    setEditingId(null)
    resetForm()
  }


  return (
         <center>

    <div >
       
      <h1>Practical 2(satvik)</h1>
      <form onSubmit={editingId ? handleUpdate : handleCreate} >
        <div >
          <input name="name"  placeholder={'enter name'}value={form.name} onChange={handleChange} />
          <input name="price" placeholder={'enter price'}value={form.price} onChange={handleChange} />
          <input name="quantity" placeholder={'enter Quantity'} value={form.quantity} onChange={handleChange} />
          <button style={{color:'green'}} type="submit">{editingId ? 'Update' : 'Create'}</button>
          {editingId && (
            <button style={{color:'red'}}
              type="button"
              onClick={() => {
                setEditingId(null)
                resetForm()
              }}
            >
              Cancel
            </button>
          )}
        </div>
               

      </form>
      
          <br/>
      
        {items.map((it) => (
          <li key={it.id} >
            
            <br/>
            <div >
            Name:nbsp;{it.name}<b> &nbsp;&nbsp;Price:</b> {it.price} <b>&nbsp;&nbsp; Quantity: </b>{it.quantity}&nbsp;&nbsp;&nbsp;

              <button style={{color:'black'}} onClick={() => handleEdit(it)}>Edit</button>&nbsp;
              <button style={{color:'red'}} onClick={() => handleDelete(it.id)}>Delete</button>
            </div>
          </li>
        ))}
        {items.length === 0 && <li>No items yet</li>}
     
    </div>
     </center>
  )
})

export default Hello