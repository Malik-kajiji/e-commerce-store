export default {
    name:'bunner',
    title:'bunner',
    type:'document',
    fields:[
        {
            name:'image',
            title:'Image',
            type:'array',
            of:[{type:'image'}],
            options:{
                hotspot:true,
            }
        },
        {
            name:'name',
            title:'Name',
            type:'string'
        },
        {
            name:'price',
            title:'Price',
            type:'number'
        },
        {
            name:'slug',
            title:'Slug',
            type:'slug',
            options : {
                source:'name',
                maxLength: 90
            }
        },
        {
            name:'details',
            title:'Details',
            type:'string'
        },
        {
            name:'event',
            title:'Event',
            type:'string',
            options : {
                maxLength: 20
            }
        },
        {
            name:'date',
            title:'Date',
            type:'string'
        }
    ]
}