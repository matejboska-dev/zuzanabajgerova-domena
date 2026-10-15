import { serviceRoute } from '@/lib/service-pages';
const route = serviceRoute('it');
export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
