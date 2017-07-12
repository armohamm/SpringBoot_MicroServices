package com.tech.cadt.product.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Component;
import  com.tech.cadt.product.entity.Product;


@Component
@Repository
public class ProductsDAOImpl  implements IProductsDAO{

	 @PersistenceContext
	 private EntityManager entityManager;
	
	
	@Override
	public List<Product> findAllProducts() {
		
		 CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
	        CriteriaQuery<Product> criteriaQuery =criteriaBuilder.createQuery(Product.class);
	        Root<Product> product = criteriaQuery.from(Product.class);
	        TypedQuery<Product> typedQuery = entityManager.createQuery(criteriaQuery.select(product));
		    return typedQuery.getResultList();
	}

	
	
	@Override
	public Product findproductbasedonId(int id) {
		
		  Product result  =null ;
		 CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
	        CriteriaQuery<Product> criteriaQuery =criteriaBuilder.createQuery(Product.class);
	        Root<Product> productobj = criteriaQuery.from(Product.class);
	        TypedQuery<Product> typedQuery = entityManager.createQuery(criteriaQuery
		    		.select(productobj)
		            .where(criteriaBuilder.and(
		            		criteriaBuilder.equal(productobj.get("id"),id))).distinct(true)
		    );
	        if(!typedQuery.getResultList().isEmpty() && typedQuery.getResultList() !=null){
	        	
	        	result = typedQuery.getResultList().get(0);
	        }
	        	
		    return result;
	}



	@Override
	@Transactional
	public Product saveProductDetails(Product productObj) {
		
		try {
			
			System.out.println("Inside Dao class  Recieved Product Obj :"+productObj.getAvailableitems());
			
			;
			/*entityManager.getTransaction().begin();
			entityManager.persist(productObj);*/
			
			/*entityManager.getTransaction().commit();
			System.out.println("Product  Details Saved Sucessfuly");*/
			return entityManager.merge(productObj);
			
		}
		
		catch(Exception e){
			
			e.printStackTrace();
		}
		System.out.println("Object updated");
		return null;
	}

}
