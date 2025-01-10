import { Feature } from '@/constants/subscription.ts';

export const formatLocalDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};

export const getStatusColor = (statusCode: number | null) => {
    if (statusCode === null) {
        return "bg-gray-600";
    }
    if (statusCode >= 200 && statusCode < 300) {
        return "bg-green-600";
    }
    if (statusCode >= 300 && statusCode < 400) {
        return "bg-yellow-600";
    }
    if (statusCode >= 400 && statusCode < 500) {
        return "bg-red-600";
    }
    if (statusCode >= 500 && statusCode < 600) {
        return "bg-red-600";
    }
    return "bg-gray-600";
};

export const renderSubscriptionFeatureText = (feature: Feature) => {
    if (!feature.highlight) return feature.text;

    const parts = feature.text.split(' ');
    const beforeHighlight = parts.slice(0, feature.highlight.position).join(' ');
    const afterHighlight = parts.slice(feature.highlight.position + 1).join(' ');

    return (
      <>
          {beforeHighlight}{' '}
          <span className="font-bold">{feature.highlight.value}</span>
          {afterHighlight && ' ' + afterHighlight}
      </>
    );
};