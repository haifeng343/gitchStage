import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/homeMenu'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/homeModule.vue'], resolve),
                    meta: { title: '' },
                },
                {
                    path: '/ueditor',
                    component: resolve => require(['../components/page/Ueditor.vue'], resolve),
                    meta: { title: '财务管理' },
                },
                {
                    path: '/user',
                    component: resolve => require(['../components/page/UserManage.vue'], resolve),
                    meta: { title: '用户列表' }
                },
                {
                    path: '/role',
                    component: resolve => require(['../components/page/RoleManage.vue'], resolve),
                    meta: { title: '角色列表' }
                },
                {
                    path: '/roleAuth/:id',
                    component: resolve => require(['../components/page/RoleAuthList.vue'], resolve),
                    meta: {title: '角色列表-权限列表'}
                },
                {
                    path: '/function',
                    component: resolve => require(['../components/page/AuthManage.vue'], resolve),
                    meta: { title: '权限管理' }
                },
                {
                    path: '/loginlog',
                    component: resolve => require(['../components/page/Loginlog.vue'], resolve),
                    meta: { title: '登录日志' }
                },
                {
                    path: '/operationlog',
                    component: resolve => require(['../components/page/OperationLog.vue'], resolve),
                    meta: { title: '操作日志' }
                },
                {
                    path: '/department',
                    component: resolve => require(['../components/page/Department.vue'], resolve),
                    meta: { title: '部门管理' }
                },
                {
                    path: '/position',
                    component: resolve => require(['../components/page/Position.vue'], resolve),
                    meta: { title: '职位管理' }
                },
                {
                    path: '/module',
                    component: resolve => require(['../components/page/Module.vue'], resolve),
                    meta: { title: '模块管理' }
                },
                {
                    path: '/menu',
                    component: resolve => require(['../components/page/Menu.vue'], resolve),
                    meta: { title: '菜单管理' }
                },
                {
                    path: '/systemparam',
                    component: resolve => require(['../components/page/Systemparam.vue'], resolve),
                    meta: { title: '系统参数管理' }
                },
                {
                    path: '/businessparam',
                    component: resolve => require(['../components/page/Businessparam.vue'], resolve),
                    meta: { title: '业务参数管理' }
                },
                {
                    path: '/businessparamtype',
                    component: resolve => require(['../components/page/Businessparamtype.vue'], resolve),
                    meta: { title: '业务参数分类' }
                },
                {
                    path: '/callmobilelist',
                    component: resolve => require(['../components/page/CallMobileList.vue'], resolve),
                    meta: { title: '号码列表' }
                },
                {
                    path: '/callmobilelist',
                    component: resolve => require(['../components/page/CallMobileList.vue'], resolve),
                    meta: { title: '号码列表' }
                },
                {
                    path: '/callseatlist',
                    component: resolve => require(['../components/page/CallSeatList.vue'], resolve),
                    meta: { title: '席位列表' }
                },
                {
                    path: '/sellerlist',
                    component: resolve => require(['../components/page/Sellerlist.vue'], resolve),
                    meta: { title: '商家列表' },
                },
                {
                    path: '/sellerRel/:id',
                    component: resolve => require(['../components/page/SellerRel.vue'], resolve),
                    meta: { title: '商家关联' },
                },
                {
                    path: '/sellerBalanceInfo/:id',
                    component: resolve => require(['../components/page/SellerBalance.vue'], resolve),
                    meta: { title: '余额详情' },
                },
                {
                    path: '/priceModule/:id',
                    component: resolve => require(['../components/page/AddPriceModule.vue'], resolve),
                    meta: {title: '短信价格模板'}
                },
                {
                    path: '/priceCallModule/:id',
                    component: resolve => require(['../components/page/SellerPriceCallModule.vue'], resolve),
                    meta: {title: '电话价格模板'}
                },
                {
                    path: '/priceCallModuleDetail/:id',
                    component: resolve => require(['../components/page/SellerPriceCallModuleDetail.vue'], resolve),
                    meta: {title: '电话价格模板详情'}
                },
                {
                    path: '/sellerChannel/:id',
                    component: resolve => require(['../components/page/SellerChannel.vue'], resolve),
                    meta: {title: '短信渠道'}
                },
                {
                    path: '/priceModuleDetail/:id',
                    component: resolve => require(['../components/page/SellerAddPTDetail.vue'], resolve),
                    meta: {title: '查看内容'}
                },
                {
                    path: '/payParam/:type',
                    component: resolve => require(['../components/page/PayParam.vue'], resolve),
                    meta: {title: '支付参数'}
                },
                {
                    path: '/sellerrechargelog',
                    component: resolve => require(['../components/page/Sellerrechargelog.vue'], resolve),
                    meta: {title: '充值记录'}
                },
                {
                    path: '/registlog',
                    component: resolve => require(['../components/page/SellerRegistlog.vue'], resolve),
                    meta: { title: '商家注册记录' }
                },
                {
                    path: '/sellerloginlog',
                    component: resolve => require(['../components/page/Sellerloginlog.vue'], resolve),
                    meta: { title: '商家登录日志' }
                },
                {
                    path: '/operation',
                    component: resolve => require(['../components/page/SellerOperation.vue'], resolve),
                    meta: { title: '商家操作日志' }
                },
                {
                    path: '/sellermoneychangelog',
                    component: resolve => require(['../components/page/Sellermoneychangelog.vue'], resolve),
                    meta: { title: '余额变更记录' }
                },
                {
                    path: '/sellersmsbusiness',
                    component: resolve => require(['../components/page/Sellersmsbusiness.vue'], resolve),
                    meta: { title: '短信业务管理' },
                },
                {
                    path: '/sellersmsorderlist',
                    component: resolve => require(['../components/page/Sellersmsorderlist.vue'], resolve),
                    meta: { title: '商家订单列表' },
                },
                {
                    path: '/sellersmsorderDetail/:id',
                    component: resolve => require(['../components/page/SellersmsorderDetail.vue'], resolve),
                    meta: { title: '订单详情' },
                },
                {
                    path: '/accessDetail/:id',
                    component: resolve => require(['../components/page/AccessDetail.vue'], resolve),
                    meta: { title: '访问详情' },
                },
                {
                    path: '/accessList/:id',
                    component: resolve => require(['../components/page/AccessList.vue'], resolve),
                    meta: { title: '记录详情列表' },
                },
                {
                    path: '/sendDetail/:id',
                    component: resolve => require(['../components/page/sendDetail.vue'], resolve),
                    meta: { title: '发送详情' },
                },
                {
                    path: '/sellerpricetemplate',
                    component: resolve => require(['../components/page/Sellerpritem.vue'], resolve),
                    meta: { title: '系统价格模板' },
                },
                {
                    path: '/sellercontenttemplate',
                    component: resolve => require(['../components/page/SellerContentTem.vue'], resolve),
                    meta: { title: '商家内容模板' },
                },
                {
                    path: '/smsTemplateTestSend/:id',
                    component: resolve => require(['../components/page/SmsTemplateTestSend.vue'], resolve),
                    meta: { title: '短信模板测试发送' },
                },
                {
                    path: '/smsTemplateTestSendRecord/:id',
                    component: resolve => require(['../components/page/SmsTemplateTestSendRecord.vue'], resolve),
                    meta: { title: '短信模板测试发送记录' },
                },
                {
                    path: '/sellercallorderlist',
                    component: resolve => require(['../components/page/Sellercallorderlist.vue'], resolve),
                    meta: { title: '商家订单列表' },
                },
                {
                    path: '/sellercallorderlist/:id',
                    component: resolve => require(['../components/page/SellercallorderDetail.vue'], resolve),
                    meta: { title: '订单详情' },
                },
                {
                    path: '/sellerCallRecord/:id',
                    component: resolve => require(['../components/page/SellerCallRecord.vue'], resolve),
                    meta: { title: '拨打记录' },
                },
                {
                    path: '/callbusiness',
                    component: resolve => require(['../components/page/SellerCallBusiness.vue'], resolve),
                    meta: { title: '电话业务' },
                },
                {
                    path: '/sellerCallSeatList/:id',
                    component: resolve => require(['../components/page/SellerCallSeatList.vue'], resolve),
                    meta: { title: '席位列表' },
                },
                {
                    path: '/callsmsmodule',
                    component: resolve => require(['../components/page/SellerCallSmsModule.vue'], resolve),
                    meta: { title: '短信模块列表' },
                },
                {
                    path: '/callbusiness',
                    component: resolve => require(['../components/page/Callbusiness.vue'], resolve),
                    meta: { title: '电话业务' },
                },
                {
                    path: '/callpricetemplate',
                    component: resolve => require(['../components/page/Callpricetemplate.vue'], resolve),
                    meta: { title: '系统价格模板' },
                },
                {
                    path: '/banner',
                    component: resolve => require(['../components/page/Banner.vue'], resolve),
                    meta: { title: '广告管理' }
                },
                {
                    path: '/rechargegoods',
                    component: resolve => require(['../components/page/Rechargegoods.vue'], resolve),
                    meta: { title: '充值商品' }
                },
                {
                    path: '/payment',
                    component: resolve => require(['../components/page/Payment.vue'], resolve),
                    meta: { title: '支付管理' }
                },
                {
                    path: '/question',
                    component: resolve => require(['../components/page/QuestionList.vue'], resolve),
                    meta: { title: '问题列表' }
                },
                {
                    path: '/questionClassify',
                    component: resolve => require(['../components/page/QuestionClassify.vue'], resolve),
                    meta: { title: '分类列表' }
                },
                {
                    path: '/saveapi',
                    component: resolve => require(['../components/page/Saveapi.vue'], resolve),
                    meta: { title: 'API安全访问' }
                },
                {
                    path: '/moneychangelog',
                    component: resolve => require(['../components/page/Moneychange.vue'], resolve),
                    meta: { title: '余额变更记录' }
                },
                {
                    path: '/rechargerecord',
                    component: resolve => require(['../components/page/Rechargerecord.vue'], resolve),
                    meta: { title: '商家充值记录' }
                },
                {
                    path: '/rechargerank',
                    component: resolve => require(['../components/page/Rechargerank.vue'], resolve),
                    meta: { title: '商家充值排行' }
                },
                {
                    path: '/financestocklog',
                    component: resolve => require(['../components/page/Financestocklog.vue'], resolve),
                    meta: { title: '库存日志' }
                },
                {
                    path: '/financestock',
                    component: resolve => require(['../components/page/Financestock.vue'], resolve),
                    meta: { title: '库存管理' }
                },
                {
                    path: '/financeoverview',
                    component: resolve => require(['../components/page/FinancialList.vue'], resolve),
                    meta: { title: '财物总览' }
                },
                {
                    path: '/familylist_ai',
                    component: resolve => require(['../components/page/Familylist_ai.vue'], resolve),
                    meta: { title: 'AI电话-家庭列表' }
                },
                {
                    path: '/familyDetail_ai/:id',
                    component: resolve => require(['../components/page/FamilyDetail_ai.vue'], resolve),
                    meta: {title: 'AI电话-家庭详情'}
                },
                {
                    path: '/childlist_ai',
                    component: resolve => require(['../components/page/Childlist_ai.vue'], resolve),
                    meta: { title: 'AI电话-孩子列表' }
                },
                {
                    path: '/familylist_sms',
                    component: resolve => require(['../components/page/Familylist_sms.vue'], resolve),
                    meta: { title: '短信-家庭列表' }
                },
                {
                    path: '/familyDetail_sms/:id',
                    component: resolve => require(['../components/page/FamilyDetail_sms.vue'], resolve),
                    meta: {title: '短信-家庭详情'}
                },
                {
                    path: '/childlist_sms',
                    component: resolve => require(['../components/page/Childlist_sms.vue'], resolve),
                    meta: { title: '短信-孩子列表' }
                },
                {
                    path: '/areastatistic',
                    component: resolve => require(['../components/page/StatisticArea.vue'], resolve),
                    meta: { title: '地区统计' }
                },
                {
                    path: '/agestatistic',
                    component: resolve => require(['../components/page/StatisticAge.vue'], resolve),
                    meta: { title: '年龄统计' }
                },
                {
                    path: '/sexstatistic',
                    component: resolve => require(['../components/page/StatisticSex.vue'], resolve),
                    meta: { title: '性别统计' }
                },
                // 委托管理
                // 委托管理电销人员
                {
                    // 电销人员页面
                    path: '/delegateaccount',
                    component: resolve => require(['../components/page/Delegateaccount.vue'], resolve),
                    meta: { title: '电销人员',father_path:'delegateaccount'}
                },
                {
                    // 提成规则页面
                    path: '/delegateroyaltyrule/:id',
                    component: resolve => require(['../components/page/DelegateRoyaltyRule.vue'], resolve),
                    meta: { title: '提成规则',father_path:'delegateaccount' }
                },
                {
                    // 下属列表页面
                    path: '/delegatesubordinate/:id',
                    component: resolve => require(['../components/page/DelegateSubordinate.vue'], resolve),
                    meta: { title: '下属列表',father_path:'delegateaccount'  }
                },
                {
                    // 余额变更日志页面
                    path: '/delegatemoneychangelog/:id',
                    component: resolve => require(['../components/page/DelegateMoneyChangeLog.vue'], resolve),
                    meta: { title: '余额变更日志',father_path:'delegateaccount'  }
                },
                {
                    // 委托列表页面
                    path: '/delegatelist',
                    component: resolve => require(['../components/page/DelegateList.vue'], resolve),
                    meta: { title: '委托活动',father_path:'delegatelist'  }
                },
                {
                    // 委托详情页面
                    path: '/delegatedetails/:id',
                    component: resolve => require(['../components/page/DelegateDetails.vue'], resolve),
                    meta: { title: '委托详情' ,father_path:'delegatelist' }
                },
                // 电销管理-登录日志
                {
                    path: '/delegateloginlog',
                    component: resolve => require(['../components/page/Delegateloginlog.vue'], resolve),
                    meta: { title: '登录日志' ,father_path:'delegateloginlog' }
                },
                //话术模板页面
                {
                    // 话术模板页面
                    path: '/delegatetalkingskilltemplate',
                    component: resolve => require(['../components/page/DelegateTalkingskillTemplate.vue'], resolve),
                    meta: { title: '话术模板' ,father_path:'delegatetalkingskilltemplate' }
                },
                //  电销管理-席位列表
                {
                    path: '/delegateseatlist',
                    component: resolve => require(['../components/page/Delegateseatlist.vue'], resolve),
                    meta: { title: '席位列表',father_path:'delegateseatlist' }
                }, 
                // 电销人员列表
                {
                    path: '/delegateseataccountlist/:id',
                    component: resolve => require(['../components/page/DelegateseatAccountList.vue'], resolve),
                    meta: { title: '电销人员列表' ,father_path:'delegateseatlist'}
                }, 
                {
                    // 委托拨打详情页面
                    path: '/delegatecalldetails/:id',
                    component: resolve => require(['../components/page/DelegateCallDetails.vue'], resolve),
                    meta: { title: '拨打详情' ,father_path:'delegatelist' }
                },
                {
                    // 委托拨打详情拨打记录页面
                    path: '/delegatecallrecord/:id',
                    component: resolve => require(['../components/page/DelegateCallRecord.vue'], resolve),
                    meta: { title: '拨打记录' ,father_path:'delegatelist' }
                },
                {
                    // 委托话术列表页面
                    path: '/delegatetalkingskill/:id',
                    component: resolve => require(['../components/page/DelegateTalkingskill.vue'], resolve),
                    meta: { title: '话术列表',father_path:'delegatelist'  }
                },
                {
                    // 导出名单页面
                    path: '/delegateexportlist/:id',
                    component: resolve => require(['../components/page/DelegateExportList.vue'], resolve),
                    meta: { title: '导出名单' ,father_path:'delegatelist' }
                },
                {
                    // 委托分配页面
                    path: '/delegatedistribution/:id',
                    component: resolve => require(['../components/page/DelegateDistribution.vue'], resolve),
                    meta: { title: '委托分配' ,father_path:'delegatelist' }
                },
                {
                    // 委托统计页面
                    path: '/delegatestatistic/:id',
                    component: resolve => require(['../components/page/DelegateStatistic.vue'], resolve),
                    meta: { title: '委托统计' ,father_path:'delegatelist' }
                },
                // 电销提成页面
                {
                    path: '/delegateroyalty',
                    component: resolve => require(['../components/page/Delegateroyalty.vue'], resolve),
                    meta: { title: '电销提成' ,father_path:'delegateroyalty' }
                },                
                // 电销提成-结算
                {
                    path: '/delegatebalance/:id',
                    component: resolve => require(['../components/page/delegateBalance.vue'], resolve),
                    meta: { title: '结算',father_path:'delegateroyalty' }
                },
                // 提成日志
                {
                    path: '/delegateroyaltylog',
                    component: resolve => require(['../components/page/Delegateroyaltylog.vue'], resolve),
                    meta: { title: '提成日志',father_path:'delegateroyaltylog' }
                },
                // 提成排行
                {
                    path: '/delegateroyaltyrank',
                    component: resolve => require(['../components/page/Delegateroyaltyrank.vue'], resolve),
                    meta: { title: '提成排行',father_path:'delegateroyaltyrank'  }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    // 销售管理-列表
                    path: '/sell_Home',
                    component: resolve => require(['../components/page/sell_Home.vue'], resolve),
                    meta: { title: '销售列表', permission: true }
                },
                {
                    // 销售管理-上下属设置
                    path: '/sell_Subordinate/:id',
                    component: resolve => require(['../components/page/sell_Subordinate.vue'], resolve),
                    meta: { title: '上下属设置', permission: true }
                },
                {
                    // 销售管理-提成规则
                    path: '/sell_CommissRule/:id',
                    component: resolve => require(['../components/page/sell_CommissRule.vue'], resolve),
                    meta: { title: '提成规则', permission: true }
                },
                {
                    // 销售管理-模板规则
                    path: '/sell_TemplateRule/:id',
                    component: resolve => require(['../components/page/sell_TemplateRule.vue'], resolve),
                    meta: { title: '模板规则', permission: true }
                },
                {
                    // 销售管理-商家列表
                    path: '/sell_BusinessList',
                    component: resolve => require(['../components/page/sell_BusinessList.vue'], resolve),
                    meta: { title: '商家列表', permission: true }
                },
                {
                    // 销售管理-销售运营变更记录
                    path: '/sell_ChangeLog',
                    component: resolve => require(['../components/page/sell_ChangeLog.vue'], resolve),
                    meta: { title: '销售运营变更记录', permission: true }
                },
                {
                    // 销售管理-商家统计
                    path: '/sell_BusinessCount',
                    component: resolve => require(['../components/page/sell_BusinessCount.vue'], resolve),
                    meta: { title: '销售运营变更记录', permission: true }
                },
                {
                    // 销售管理-登录日志
                    path: '/sell_LoginLog',
                    component: resolve => require(['../components/page/sell_LoginLog.vue'], resolve),
                    meta: { title: '登录日志', permission: true }
                },
                {
                    // 销售管理-销售提成
                    path: '/sell_CommissManage',
                    component: resolve => require(['../components/page/sell_CommissManage.vue'], resolve),
                    meta: { title: '销售提成', permission: true }
                },
                {
                    // 销售管理-提成模板
                    path: '/sellerroyaltytemplate',
                    component: resolve => require(['../components/page/sellerroyaltytemplate.vue'], resolve),
                    meta: { title: '提成模板', permission: true }
                },
                {
                    // 销售管理-提成结算
                    path: '/sell_CommissSettlment',
                    component: resolve => require(['../components/page/sell_CommissSettlment.vue'], resolve),
                    meta: { title: '提成结算', permission: true }
                },
                {
                    // 销售管理-结算日志
                    path: '/sell_CommissionLog',
                    component: resolve => require(['../components/page/sell_CommissionLog.vue'], resolve),
                    meta: { title: '结算日志', permission: true }
                },
                {
                    // 销售管理-提成排行
                    path: '/sell_CommissionRanking',
                    component: resolve => require(['../components/page/sell_CommissionRanking.vue'], resolve),
                    meta: { title: '提成排行', permission: true }
                },
                {
                    // 分类管理-标签列表
                    path: '/traceTagList',
                    component: resolve => require(['../components/page/traceTagList.vue'], resolve),
                    meta: { title: '标签列表', permission: true }
                },
                {
                    // 分类管理-分类列表
                    path: '/traceTypeList',
                    component: resolve => require(['../components/page/traceTypeList.vue'], resolve),
                    meta: { title: '分类列表', permission: true }
                },
                {
                    // 分类管理-电话摘要
                    path: '/traceAbstractTag',
                    component: resolve => require(['../components/page/traceAbstractTag.vue'], resolve),
                    meta: { title: '电话摘要', permission: true }
                },
                {
                    // 客服微信管理
                    path: '/Customer',
                    component: resolve => require(['../components/page/Customer.vue'], resolve),
                    meta: { title: '客服微信管理', permission: true }
                },
                {
                    // 原始数据-家庭列表
                    path: '/Familylist_source',
                    component: resolve => require(['../components/page/familylist_source.vue'], resolve),
                    meta: { title: '原始数据-家庭列表', permission: true }
                },
                {
                    // 原始数据-家庭详情
                    path: '/FamilyDetail_source/:id',
                    component: resolve => require(['../components/page/FamilyDetail_source.vue'], resolve),
                    meta: {title: '原始数据-家庭详情'}
                },
                {
                    // 原始数据-AI过滤记录
                    path: '/FilterLog',
                    component: resolve => require(['../components/page/FilterLog.vue'], resolve),
                    meta: {title: '原始数据-AI过滤记录'}
                },
                {
                    // 原始数据-孩子列表
                    path: '/Childlist_source',
                    component: resolve => require(['../components/page/Childlist_source.vue'], resolve),
                    meta: { title: '原始数据-孩子列表', permission: true }
                },
                {
                    // 短信管理-发送记录
                    path: '/Sms_sendrecord',
                    component: resolve => require(['../components/page/sms_sendrecord.vue'], resolve),
                    meta: { title: '短信管理-发送记录', permission: true }
                },
                {
                    // 短信管理-短信模板
                    path: '/Sms_module',
                    component: resolve => require(['../components/page/Sms_module.vue'], resolve),
                    meta: { title: '短信管理-短信模板', permission: true }
                },
                {
                    // 短信管理-任务列表
                    path: '/Sms_tasklist',
                    component: resolve => require(['../components/page/Sms_tasklist.vue'], resolve),
                    meta: { title: '短信管理-任务列表', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/homeMenu',
            component: resolve => require(['../components/common/HomeMenu.vue'], resolve)
        },
        // {
        //     path: '*',
        //     redirect: '/404'
        // }
    ]
})

