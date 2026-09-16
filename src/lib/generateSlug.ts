// utils/generateSlug.ts

export function generateSlug(pageName: string): string {
    return pageName
      .toString()
      .trim()
      .toLowerCase()
      .normalize('NFD')                   
      .replace(/[\u0300-\u036f]/g, '')     
      .replace(/[^a-z0-9\s-]/g, '')        
      .replace(/\s+/g, '-')                
      .replace(/-+/g, '-')                 
      .replace(/^-+|-+$/g, '');            
  }