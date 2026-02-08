
export function getClientIP(req) {
  // Express request object
  const forwarded = req.headers['x-forwarded-for'];
  const realIP = req.headers['x-real-ip'];
  const cfConnectingIP = req.headers['cf-connecting-ip'];
  const connectionIP = req.connection?.remoteAddress;
  const socketIP = req.socket?.remoteAddress;
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP.trim();
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }
  
  if (connectionIP && connectionIP !== '::1' && !connectionIP.startsWith('127.')) {
    return connectionIP;
  }
  
  if (socketIP && socketIP !== '::1' && !socketIP.startsWith('127.')) {
    return socketIP;
  }
  
  return req.ip || 'unknown';
}


export async function getIPGeolocation(ip) {
  if (!ip || ip === 'unknown' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.') || ip === '::1') {
    return {
      country: null,
      city: null,
      region: null,
      isp: null,
    };
  }

  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,city,regionName,isp`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`IP API returned ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'success') {
      return {
        country: data.country || null,
        city: data.city || null,
        region: data.regionName || null,
        isp: data.isp || null,
      };
    } else {
      console.warn('IP geolocation failed:', data.message);
      return {
        country: null,
        city: null,
        region: null,
        isp: null,
      };
    }
  } catch (error) {
    console.error('Error fetching IP geolocation:', error);
    return {
      country: null,
      city: null,
      region: null,
      isp: null,
    };
  }
}

