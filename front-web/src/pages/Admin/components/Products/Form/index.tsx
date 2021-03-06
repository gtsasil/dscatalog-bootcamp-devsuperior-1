import { makeRequest } from 'core/utils/request';
import React, { useState } from 'react'
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
   name: string;
   price: string;
   category: string;
   description:string
}
type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>


const Form = () => {

   const [formData, setFormData] = useState<FormState>({
      name:'',
      price:'',
      category:'1',
      description:''
   });
  
   const hanldeOnChange = (event :FormEvent) =>{
      const name = event.target.name;
      const value = event.target.value;
      
      setFormData(data =>({ ...data,[name]: value}));
   }
   const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=> {
      event.preventDefault();

      const payload = {
         ...formData,
         imgUrl:'https://a-static.mlcdn.com.br/1500x1500/console-xbox-360-4gb-2-controles-wireless-microsoft/comercialfkl/369/15adbdeceaa41972b111e5117caeb994.jpg',
         categories:[{id: formData.category}]
      }
         makeRequest({url: '/products', method:'POST', data: payload}).then(()=>{
            setFormData({name:'', category:'',price:'', description:''});
         })
   }
   
 return (
    <form onSubmit={handleSubmit}>
      <BaseForm  title="cadastrar um produto">
      <div className="row">
         <div className="col-6">
            <input
            value={formData.name}
            name="name"
            type="text"
            className="form-control mb-5"
            onChange={hanldeOnChange}
            placeholder="Nome do produto"
            />
            <select 
            value={formData.category}
             className="form-control mb-5" onChange={hanldeOnChange}
             name="category"
             >
               <option value="1">Livros</option>
               <option value="3">Computadores</option>
               <option value="2">Eletronicos</option>
            </select>
            <input
            value={formData.price}
            name="price"
            type="text"
            className="form-control"
            onChange={hanldeOnChange}
            placeholder="Pre??o"
            />
         </div>
         <div className="col-6">
         <textarea 
            name="description" 
            value={formData.description}
            onChange={hanldeOnChange}
            className="form-control"
            cols={30}
            rows={10} 
         />
         </div>
      </div>
    </BaseForm>
    </form>
    )
}

export default Form;