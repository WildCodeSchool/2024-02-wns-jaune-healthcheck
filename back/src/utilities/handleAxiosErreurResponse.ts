type ErrorResponse = {
  data: string;
  status: number;
  headers: {
      'content-type': string;
  };
}

const handleAxiosErrorResponse = (error: string | undefined): ErrorResponse => {
  const baseResponse = {
      data: '',
      status: 500,
      headers: {
          'content-type': 'unknown'
      },
  };

  // Si pas d'erreur, retourne une réponse par défaut
  if (!error) {
      return {
          ...baseResponse,
          data: 'Unknown error occurred'
      };
  }

  switch (error) {
      // Erreurs réseau
      case 'ECONNABORTED':
          return {
              ...baseResponse,
              status: 408,
              data: 'Request timeout'
          };

      case 'ECONNREFUSED':
          return {
              ...baseResponse,
              status: 503,
              data: 'Connection refused'
          };

      case 'ENOTFOUND':
          return {
              ...baseResponse,
              status: 502,
              data: 'DNS lookup failed'
          };

      case 'EHOSTUNREACH':
      case 'ENETUNREACH':
          return {
              ...baseResponse,
              status: 503,
              data: 'Network unreachable'
          };

      // Erreurs SSL/TLS
      case 'UNABLE_TO_VERIFY_LEAF_SIGNATURE':
      case 'CERT_HAS_EXPIRED':
      case 'CERT_NOT_YET_VALID':
      case 'ERR_TLS_CERT_ALTNAME_INVALID':
          return {
              ...baseResponse,
              status: 525,  // SSL Handshake Failed
              data: 'SSL Certificate error'
          };

      // Erreurs de configuration Axios
      case 'ERR_BAD_REQUEST':
          return {
              ...baseResponse,
              status: 400,
              data: 'Bad request configuration'
          };

      case 'ERR_BAD_RESPONSE':
          return {
              ...baseResponse,
              status: 502,
              data: 'Invalid server response'
          };

      case 'ERR_BAD_OPTION_VALUE':
          return {
              ...baseResponse,
              status: 500,
              data: 'Invalid client configuration'
          };

      default:
          // Erreur inconnue
          return {
              ...baseResponse,
              data: 'Unknown error occurred'
          };
  }
}

export default handleAxiosErrorResponse;