import { serviceRoute } from '@/lib/service-pages';
const route = serviceRoute('en');
export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
