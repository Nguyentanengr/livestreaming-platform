package com.anonymous.streaming_platform.config;


import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Objects;

@Configuration
@EnableTransactionManagement // cho phép sử dụng @Transactional
@EnableJpaRepositories( // Chỉ định các repository JPA cho Mysql
        basePackages = "com.anonymous.streaming_platform.repository.mysql",
        entityManagerFactoryRef = "mysqlEntityManagerFactory", // Chỉ định EntityManagerFactory Bean cho các repository này
        transactionManagerRef = "mysqlTransactionManager" // Chỉ định TransactionManager Bean cho các transaction
)
public class MySqlDataSourceConfig {

    @Bean
    @ConfigurationProperties("spring.datasource.mysql") // Đọc cấu hình từ file application.properties
    public DataSourceProperties mysqlDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean(name = "mysqlDataSource")
    public DataSource mysqlDataSource() {
        return mysqlDataSourceProperties()
                .initializeDataSourceBuilder()
                .build(); // Khởi tạo datasource với HikariCP mặc định
    }

    @Bean(name = "mysqlEntityManagerFactory") // tạo EntityManager để quản lý các Entity Mysql
    public LocalContainerEntityManagerFactoryBean mysqlEntityManagerFactory(
            @Qualifier("mysqlDataSource") DataSource dataSource
    ) {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        em.setPackagesToScan("com.anonymous.streaming_platform.entity.mysql"); // Chỉ định package chứa các entity

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);

        HashMap<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", "update");
        properties.put("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect");
        properties.put("hibernate.jdbc.batch_size", 50);
        properties.put("hibernate.order_updates", true);
        em.setJpaPropertyMap(properties);

        return em;
    }


    @Bean(name = "mysqlTransactionManager") // Tạo TransactionManager để quản lý các transaction
    public PlatformTransactionManager mysqlTransactionManager(
            @Qualifier("mysqlEntityManagerFactory")
            LocalContainerEntityManagerFactoryBean mysqlEntityManagerFactory) {
        return new JpaTransactionManager(Objects.requireNonNull(mysqlEntityManagerFactory.getObject()));
    }

}
