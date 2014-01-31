From root directory (1 level above WEB-INF), run these commands to compile and create the WAR file:

javac web-inf/sources/*.java -cp 'web-inf/lib/*' -d 'web-inf/classes/'
jar cvf p2.war META-INF WEB-INF index.html

Deploy on the Apache Tomcat server as a servlet.