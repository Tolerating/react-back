const menuList = [
    {
        title:'首页',    //菜单标题名称
        key:'/admin/home',   //对应的path
        icon:'home',     //图标名称
        isPublic:true,    //是否公开的
    },
    {
        title:'商品',
        key:'/admin/products',
        icon:'appstore',
        children:[
            {
                title:'品类管理',
                key:'/admin/category',
                icon:'bars'
            },
            {
                title:'商品管理',
                key:'/admin/product',
                icon:'tool'
            },
        ]
    },
    {
        title:'用户管理',
        key:'/admin/user',
        icon:'user',
    },
    {
        title:'角色管理',
        key:'/admin/role',
        icon:'safety',
    },
    {
        title:'图形图表',
        key:'/admin/charts',
        icon:'area-chart',
        children:[
            {
                title:'柱形图',
                key:'/admin/charts/bar',
                icon:'bar-chart'
            },
            {
                title:'折线图',
                key:'/admin/charts/line',
                icon:'line-chart'
            },
            {
                title:'饼图',
                key:'/admin/charts/pie',
                icon:'pie-chart'
            },
        ]
    }
];
export default menuList;