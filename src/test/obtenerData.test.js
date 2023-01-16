import {vi,describe,it,expect, beforeAll} from 'vitest'
const obtenerData=require('../controller/product')


describe('Evaluate obtenerData',()=>{
    const req ={}
    const res = {
        render: vi.fn()
      };
     beforeAll(()=>{
        res.render.mockClear()
        
      })
      
    it('should be a function ',()=>{
        expect(typeof obtenerData).toBe('function')})
    it('should throw an error if both params are not objects',()=>{
        expect(()=>obtenerData("uno",1)).toThrow()
        expect(()=>obtenerData({},"uno")).toThrow()
        expect(()=>obtenerData(1,true)).toThrow()
        expect(()=>obtenerData({},2)).toThrow()
        expect(()=>obtenerData({},false)).toThrow()
        expect(()=>obtenerData({},Nan)).toThrow()
    })
    it('should return a mock of a product',()=>{
        obtenerData(req,res)
        expect(res.render).toHaveBeenCalled()
    })
})

