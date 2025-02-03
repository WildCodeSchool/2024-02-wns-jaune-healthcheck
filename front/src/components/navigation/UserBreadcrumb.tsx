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
    path: string;
    urlName?: string;
};

type breadcrumbWrapperProps = {
    children: React.ReactNode;
};

type UrlBreadCrumbProps = {
    urlId: string;
};

const BreadcrumbWrapper: React.FC<breadcrumbWrapperProps> = ({ children }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>{children}</BreadcrumbList>
        </Breadcrumb>
    );
};

const DashboardBreadcrumb: React.FC = () => {
    return (
        <BreadcrumbWrapper>
            <BreadcrumbItem className="block">Tableau de bord</BreadcrumbItem>
        </BreadcrumbWrapper>
    );
};

const UrlsBreadcrumb: React.FC = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="block">URLs</BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

const HistoriesBreadcrumb: React.FC = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="block">Historiques</BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

const UrlBreadcrumb: React.FC<UrlBreadCrumbProps> = ({ urlId }) => {
    const { data, loading } = useUrlQuery({
        variables: {
            urlId: urlId,
        },
    });

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="block">
                    <BreadcrumbLink asChild>
                        <Link to="/urls">URLs</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="block">
                    {loading && "..."}
                    {data && !loading && data.url?.name}
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

const HistoryBreadcrumb: React.FC<UrlBreadCrumbProps> = ({ urlId }) => {
    const { data, loading } = useUrlQuery({
        variables: {
            urlId: urlId,
        },
    });

    return (
      <Breadcrumb>
          <BreadcrumbList>
              <BreadcrumbItem className="block">
                  <BreadcrumbLink asChild>
                      <Link to="/urls">Historiques</Link>
                  </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="block">
                  {loading && "..."}
                  {data && !loading && data.url?.name}
              </BreadcrumbItem>
          </BreadcrumbList>
      </Breadcrumb>
    );
};

const ProfileSubscription: React.FC = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="block">Profil</BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

const UserBreadcrumb: React.FC<UserBreadcrumbProps> = ({ path }) => {
    const { id } = useParams();

    switch (path) {
        case "/dashboard":
            return <DashboardBreadcrumb />;
        case "/urls":
            return <UrlsBreadcrumb />;
        case "/histories":
            return <HistoriesBreadcrumb />;
        case `/user-url/${id}`:
            if (!id) return null;
            return <UrlBreadcrumb urlId={id} />;
        case `/history-url/${id}`:
            if (!id) return null;
            return <HistoryBreadcrumb urlId={id} />;
        case "/profile":
            return <ProfileSubscription />;
        default:
            return null;
    }
};

export default UserBreadcrumb;
