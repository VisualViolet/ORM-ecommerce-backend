const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  Category.findAll({
    include:{
      model: Product
    }
  }).then(data=>{
    res.json(data)
  }).catch(err=> {
    res.status(500).json({
      msg:"An error occured returning data.",
      err: err
    })
  })
});

router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {
    include:{
      model: Product
    }
  }).then(data=> {
    if (data){
      return res.json(data);
    } else{
      res.status(404).json({
        msg:"Category does not exist"
      })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
        msg:"An error occurred",
        err:err
    })
  })
});

router.post('/', (req, res) => {
  Category.create({
    category_name:req.body.category_name
  }).then(data=>{
    res.status(201).json(data)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
        msg:"An error occured",
        err:err
    })
  })
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where:{
        id:req.params.id
    }
  }).then(data=>{
    if(data[0]){
        return res.json(data)
    } else {
        return res.status(404).json({msg:"Category does not exist."})
    }
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
        msg:"An error occurred",
        err:err
    })
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where:{
        id:req.params.id
    }
  }).then(data=>{
    if(data){
        return res.json(data)
    } else {
        return res.status(404).json({msg:"Category does not exist."})
    }
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
        msg:"An error occurred",
        err:err
    })
  })
});

module.exports = router;
