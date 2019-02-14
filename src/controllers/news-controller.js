const validator = require('validator');
const News = require('../models/news-model');
const { isEmpty, isString } = require('../utils/functions');


exports.get = async (ctx) =>{
    let news = await News.find({});
    return ctx.ok({success:true, allNews: news})
}

exports.getNews = async (ctx) =>{
    let id = ctx.params.id;
    let news = await News.findById(id);
    return ctx.ok({success:true, news:news})
}

exports.create = async (ctx) =>{
    let reqData = ctx.request.body; 
    if(!isString(reqData.title) || ! isString(reqData.text)){
        return ctx.badRequest({success:false, message: "FieldsMissingOrIncorrect"})
    }else{
        reqData.createdBy = ctx.auth.id;
        let news = await new News(reqData).save()
        return ctx.ok({success:false, news: news})
    }
}

exports.update = async (ctx) => {
    let id = ctx.params.id;
    let reqData = ctx.request.body;
    let news = await News.findByIdAndUpdate(id, { $set: reqData }, { new: true })
    return ctx.ok({success: true, news:news})
    
}

exports.delete = async (ctx) =>{
    const id = ctx.params.id;
    await News.findByIdAndRemove(id);
    return ctx.ok({ success: true })
}

exports.addCommentary = async (ctx) =>{
    const id = ctx.params.id;
    const reqData = ctx.request.body;
    if(!isString(reqData.commentary)){
        return ctx.badRequest({success:false, message: "FieldsMissingOrIncorrect"})
    }else{
        let commentary = {createdBy: ctx.auth.id, text: reqData.commentary }
        let news = await News.findByIdAndUpdate(id, { $addToSet: {commentaries: commentary} }, { new: true })
        return ctx.ok({success:true, news:news})
    }
}