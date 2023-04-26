import { createWebHashHistory, createRouter } from "vue-router";
import GenericDetails from "../views/GenericDetails.vue";
import SearchPage from "../views/SearchPage.vue";

const routes = [
	{
		path: '/details/:name',
		component: GenericDetails,
		props: { default: true },
		name:'GenericDetails'
		// redirect: to => {
		// 	return { path: '/details', query: { q: to.params.name } }
		// },
	},
	{
		path: '/',
		component: SearchPage
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;