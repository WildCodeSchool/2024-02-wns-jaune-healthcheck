import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Link, useParams } from "react-router-dom";
import { useUrlQuery } from "@/generated/graphql-types";


type UserBreadcrumbProps = {
  path: string,
  urlName?: string
}

type breadcrumbWrapperProps = {
  children: React.ReactNode
}

type UrlBreadCrumbProps = {
  urlId: string
}

const BreadcrumbWrapper: React.FC<breadcrumbWrapperProps> = ({ 
  children 
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {children}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const DashboardBreadcrumb: React.FC = () => {
  return (
    <BreadcrumbWrapper>
        <BreadcrumbItem className="hidden md:block">
            Tableau de bord
        </BreadcrumbItem>
    </BreadcrumbWrapper>
  );
}

const UrlsBreadcrumb: React.FC = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
            Mes urls
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const HistoriesBreadcrumb: React.FC = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
            Mes historiques
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const UrlBreadcrumb: React.FC<UrlBreadCrumbProps> = ({
  urlId
}) => {

  const { data, loading } = useUrlQuery({
    variables: {
      urlId: urlId
    }
  });

  
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard/urls ">
            Mes urls
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="hidden md:block">
            { (loading) && "..." }
            { (data && !loading) && data.url?.name }
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const UserBreadcrumb: React.FC<UserBreadcrumbProps> = ({
  path,
}) => {

  const { id } = useParams();

  switch (path) {
    case "/dashboard/overview":
      return <DashboardBreadcrumb />;
    case "/dashboard/urls":
      return <UrlsBreadcrumb />;
    case "/dashboard/histories":
      return <HistoriesBreadcrumb />;
    case `/dashboard/url/${id}`:	
      if (!id) return null;
      return <UrlBreadcrumb urlId={id}/>;
    default:
      return null;
  }
}

export default UserBreadcrumb;