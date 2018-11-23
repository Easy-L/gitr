# hybf
项目需知:使用eclispe客户端请注释掉/parent/pom.xml文件中的  <build> <plugins>下的
    <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <configuration>
            <fork>true</fork>
        </configuration>
    </plugin>

### 系统架构：          
------------------
- spring-cloud 2.0.0
- spring-data-jpa
- spring-security
- angular 5.2.0


### 接口url风格：

/api/control/{resource}/{id}             
------------------
- GET
- 获取resource对象（id是resource的标识）

/api/control/{resource}/list             
------------------
- POST
- 获取resource资源的的列表（包含查询）

 /api/control/{resource}                  
------------------
- POST
- 新增resource对象

 /api/control/{resource}/{id}                  
------------------
- PUT
- 修改resource对象（id是resource的标识）

 /api/control/{resource}/{id}               
------------------
- DELETE
- 删除resource对象（id是resource的标识）

 /api/control/{resource}    		          
------------------
- DELETE
- 批量删除